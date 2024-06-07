import asyncio
from itertools import chain
import os
from tabnanny import verbose
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain_openai import ChatOpenAI
from langchain.document_loaders import CSVLoader
from langchain.vectorstores import FAISS
from langchain.callbacks.manager import get_openai_callback
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains.retrieval_qa.base import RetrievalQA
import requests
import base64
from io import BytesIO
from PIL import Image

from datetime import datetime

api_key  = os.environ["OPENAI_API_KEY"] = "sk-proj-4xmR0dcPdBQcjqBK2gyZT3BlbkFJp3tCODKJn2MDEPJBKwkC"

llm = ChatOpenAI(
    temperature=0.5,
    openai_api_key= api_key,
    model_name='gpt-4o' 
)
embeddings = OpenAIEmbeddings()
# database_demeter = FAISS.load_local("demeter", embeddings)
database_commect = FAISS.load_local("nova_idx", embeddings, allow_dangerous_deserialization=True)

def process_question_test(question_asked1, question_asked2, question_asked3, answer1, answer2):
  prompt_template = """ 

  You are a friendly AI assistant answering tourist questions related to the city of Novi Sad. Only use data from the context.
  Never answer questions unrelated to Novi Sad. Always assume the question is related to Novi Sad when the city is not named.
  If you can't find the answer from the database, say: 'I apologize, I don't know the answer to this question at the moment. Ask later, I'll be smarter :)'
  If the user asks a question not related to tourism in Novi Sad, respond with: 'I'm sorry, but I only answer to questions related to tourism in Novi Sad.'
  Never write the data source in the response.
 
  {context}

  ALWAYS answer on Serbian language. If the question is asked in cyrillic script answer in the cyrillic script, if not, answer in latin.

  {chat_history}

  Question: {question} 


  ### Instruction ###
  Always answer on Serbian."""
  PROMPT = PromptTemplate(
      template=prompt_template, input_variables=["context", "question", "chat_history"]
  )

  memory = ConversationBufferMemory(memory_key="chat_history", input_key="question")

  memory.chat_memory.add_user_message(question_asked1)
  memory.chat_memory.add_ai_message(answer1)

  memory.chat_memory.add_user_message(question_asked2)
  memory.chat_memory.add_ai_message(answer2)

  dictonary = {
    'answer': '',
    'tokens_spent': '',
  }
  
  if isnt_base64_image(question_asked3):
    query = question_asked3
  else:
    headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {api_key}"
    }

    payload = {
      "model": "gpt-4o",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "What object is in this image? Be exact, do not use lyrical descriptions. The image is most likely to be captured in Novi Sad, Serbia. Reply in Serbian"
            },
            {
              "type": "image_url",
              "image_url": {
                "url": f"data:image/jpeg;base64,{question_asked3}"
              }
            }
          ]
        }
      ],
      "max_tokens": 300
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    print(response.json())
    response = response.json()
    responses = list() # all responses
    for choice in response['choices']:
        responses.append(choice['message']['content'])

    for i, response in enumerate(responses):
      print(f"Odgovor {i}: {response}")
    query = responses[0]
  
  chain_type_kwargs = {"prompt": PROMPT, "memory": memory, "verbose":True}
 
  qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=database_commect.as_retriever(search_type="similarity_score_threshold", search_kwargs={'lambda_mult': 0.75, 'score_threshold': 0.8}), chain_type_kwargs=chain_type_kwargs)

  with get_openai_callback() as cb:
    result = qa.run(query)

    print(f"Total Tokens: {cb.total_tokens}")
    print(f"Prompt Tokens: {cb.prompt_tokens}")
    print(f"Completion Tokens: {cb.completion_tokens}")
    print(f"Total Cost (USD): ${cb.total_cost}")
  
  dictonary['query'] = query
  dictonary['answer'] = result
  dictonary['tokens_spent'] = cb.total_tokens

  return dictonary



if __name__ == '__main__':
  q_a = []
  while True:
     question = input("Question: ")
     if len(q_a) > 0:
       # ovde imamo istoriju caskanja
       # pitanje koje se istorijski prvo desilo
       question_answer_1 = q_a[-1] if len(q_a) == 1 else q_a[-2]
       question_answer_2 = q_a[-1] if len(q_a) >= 2 else  {"answer": "", "question" : ""}
       res = process_question_test(question_answer_1["question"], question_answer_2["question"], question, question_answer_1["answer"], question_answer_2["answer"])
       q_a.append({"answer":res["answer"], "question": question})
       print(res["answer"])
     else: 
       # nema istorije
       res = process_question_test("", "", question, "", "")
       q_a.append({"answer":res["answer"], "question": question})
       print(res["answer"])

def isnt_base64_image(input_str):
    try:
        # Decode base64 string
        decoded = base64.b64decode(input_str)
        
        # Try to open as an image
        img = Image.open(BytesIO(decoded))
        
        # If the above line doesn't raise an exception, it's likely a valid image
        return False
    except Exception as e:
        # If any exception occurs during decoding or opening, it's not a valid image
        return True