import os
os.environ["OPENAI_API_KEY"] = "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"
# Updated imports as per deprecation warnings
from langchain_community.document_loaders import PyPDFLoader, CSVLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

# Ensure PyPDF2 is installed
from PyPDF2 import PdfReader

# Your remaining script code here



embeddings = OpenAIEmbeddings()

def embed_index(doc_list, embed_fn, index_store):
    """Function takes in existing vector_store, 
    new doc_list and embedding function that is 
    initialized on appropriate model. Local or online. 
    New embedding is merged with the existing index. If no 
    index given a new one is created"""
    
    # Extract the text content from each Document object in doc_list
    texts = [doc.page_content for doc in doc_list]

    # Try to create the FAISS index
    try:
        faiss_db = FAISS.from_texts(texts, embed_fn)
    except Exception as e:
        # Handle the exception accordingly
        print(f"Error creating FAISS index: {e}")
        return None
    
    # Check if the index store already exists
    if os.path.exists(index_store):
        # Load the index with dangerous deserialization enabled
        local_db = FAISS.load_local(index_store, embed_fn, allow_dangerous_deserialization=True)
        # Merging the new embedding with the existing index store
        local_db.merge_from(faiss_db)
        print("Merge completed")
        local_db.save_local(index_store)
        print("Updated index saved")
    else:
        faiss_db.save_local(folder_path=index_store)
        print("New database store created...")
    
    return faiss_db

def get_text_splits(text_file):
  """Function takes in the text data and returns the  
  splits so for further processing can be done."""
  print("Splitting .txt file into chunks...Please wait...")
  # with open(text_file,'r') as txt:
  #   data = txt.read()

  loader = TextLoader(text_file)
  documents = loader.load()

  textSplit = RecursiveCharacterTextSplitter(chunk_size=600,
                                            chunk_overlap=60,
                                            length_function=len)
  doc_list = textSplit.split_documents(documents)

  return doc_list

def get_pdf_splits(pdf_file):
  print("Splitting .pdf file into chunks...Please wait...")
  """Function takes in the pdf data and returns the  
  splits so for further processing can be done."""
  
  # loader = PyPDFLoader(pdf_file)
  # pages = loader.load_and_split()  

  # pdf_loader = PdfReader(pdf_file) 

  # raw_text = ''
  # for i, page in enumerate(pdf_loader.pages): 
  #   text = page.extract_text()
  #   if text:
  #     raw_text += text

  # text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=60, length_function=len)
  # texts = text_splitter.split_text(raw_text)

  # textSplit = RecursiveCharacterTextSplitter(chunk_size=300,
  #                                          chunk_overlap=60,
  #                                          length_function=len)
  # doc_list = []
  # # # #Pages will be list of pages, so need to modify the loop
  # for pg in pages:
  #   pg_splits = textSplit.split_documents(pg.page_content)
  #   doc_list.extend(pg_splits)

  loader = PyPDFLoader(pdf_file)
  pages = loader.load_and_split()  

  textSplit = RecursiveCharacterTextSplitter(chunk_size=300,
                                            chunk_overlap=60,
                                            length_function=len)
  doc_list = []
  #Pages will be list of pages, so need to modify the loop
  # for pg in pages:
  #   pg_splits = textSplit.split_documents(pg.page_content)
  #   doc_list.extend(pg_splits)

  # return doc_list

  return pages

def read_csv(csv_file):
  print("Splitting .csv file into chunks...Please wait...")
  """Function takes in the pdf data and returns the  
  splits so for further processing can be done."""
  loader = CSVLoader(file_path=csv_file)
  data = loader.load()
  return data
  
# file_choice = input("Do you want to store .pdf or .txt file into database: ")
# if file_choice == ".pdf": 
# docs_demeter / docs_commect
document_name = input("Please enter file name you want to store into database: ") 
dir = './' + document_name + "/"
document_pdf_names = []
document_txt_names = []
document_csv_names = []
all_doc = os.listdir(dir)
print(all_doc)
for file in all_doc:
  if file.endswith(".pdf"):
    document_pdf_names.append(dir + file)
  elif file.endswith(".txt"):
    document_txt_names.append(dir + file)
  elif file.endswith(".csv"):
    document_csv_names.append(dir + file)
  
print(document_pdf_names)
print("-----------------")
print(document_txt_names)

document_splits = []
for doc in document_pdf_names: 
  document_splits.extend(get_pdf_splits(doc))   

for doc in document_txt_names: 
  document_splits.extend(get_text_splits(doc))

for doc in document_csv_names: 
  document_splits.extend(read_csv(doc))
  
# demeter or commect
database_name = input("File splitted into chunks. \nPlease enter database directory name: ")

creating_database_index = embed_index(document_splits, embeddings, database_name)
