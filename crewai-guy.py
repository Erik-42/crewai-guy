import os
from flask import Flask, request, render_template, jsonify
from crewai import Agent, Task, Crew
from langchain_community.llms import HuggingFaceEndpoint
# from langchain_community.llms import Ollama
# from langchain_openai import ChatOpenAI
# from langchain_community.llms import HuggingFaceHub

# Définition de l'application Flask avec un dossier statique personnalisé
app = Flask(__name__, static_folder='/static')

# Configuration du modèle
# llm = Ollama(model="mistral")  # Pour utiliser Ollama
# llm = ChatOpenAI(model_name="gpt-3.5-turbo")  # Pour utiliser OpenAI
llm = HuggingFaceEndpoint(
    endpoint_url="https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
    huggingfacehub_api_token=os.environ.get('HUGGINGFACEHUB_API_TOKEN'),
    model_kwargs={"temperature": 0.5, "max_new_tokens": 500}
#    temperature=0.5,
#    max_new_tokens=500
)

# llm = HuggingFaceHub(
#    repo_id="deepseek-ai/deepseek-coder-6.7b-instruct",
#    model_kwargs={"temperature": 0.5, "max_new_tokens": 500}
# ) #pour utiliser DeepSeek

# Créez un agent
agent = Agent(
    role="Assistant",
    goal="Aider à la formation d'ingénieur informatique",
    backstory="Je suis un assistant IA spécialisé dans l'aide aux étudiants en ingénierie informatique.",
    verbose=True,
    llm=llm
)

# Créez une tâche
task = Task(
    description="Expliquer le concept de programmation orientée objet avec des exemples principalement en Python",
    agent=agent
)

# Créez un équipage avec l'agent
crew = Crew(
    agents=[agent],
    tasks=[task],
    verbose=True
)


@app.route('/crewai', methods=['GET'])
def index():
    return render_template('guy/index.html')

@app.route('/run_crewai', methods=['GET'])
def run_crewai():
    result = crew.kickoff()
    return jsonify({"result": str(result)})

if __name__ == '__main__':
#     app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)

