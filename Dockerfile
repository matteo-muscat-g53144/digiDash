#Use official Python runtime as a parent image
FROM python:3.8-slim

#Setting working directory
WORKDIR /app

#Upgrading pip
RUN pip install --upgrade pip

#Setting up venv
RUN python -m venv digiDash
ENV PATH="app/digiDash/bin:$PATH"

#Installing dependencies in the virtual environment
COPY requirements.txt .
RUN pip install -r requirements.txt

#Exposing port 80
EXPOSE 80

#Copy current directory contents into container at /app
COPY . .

#Run the app
CMD ["python", "main.py"]
