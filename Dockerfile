#FROM nvidia/cuda:11.8.0-devel-ubuntu20.04
FROM ubuntu:20.04

WORKDIR /home/appuser

RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install langchain
RUN pip3 install langchain_community
RUN pip3 install langchain_openai
RUN pip3 install faiss-cpu
RUN pip3 install openai

RUN pip3 install PyPDF2 
RUN pip3 install pypdf

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY db_fill.py ./

COPY DemoAppLangChain.py ./ 
COPY semantic_search_test.py ./ 
COPY pdfs_novi_sad ./pdfs_novi_sad/

COPY nova_idx ./nova_idx/

CMD [ "python3", "-m" , "DemoAppLangChain", "run", "--host=0.0.0.0"]
