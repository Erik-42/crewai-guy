import os
from crewai import Agent, Task, Crew, Process
# from langchain_community.llms import Ollama
# from langchain_openai import ChatOpenAI
# from langchain_community.llms import HuggingFaceHub
from langchain_huggingface import HuggingFaceEndpoint

## Configuration du modèle Ollama
# llm = Ollama(model="llama3") # local
# llm = Ollama(model="mistral")  # modèle plus léger local
# llm = ChatOpenAI(model_name="gpt-3.5-turbo") # externe avec API
llm = HuggingFaceEndpoint(
    endpoint_url="https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
#     repo_id="mistralai/Mistral-7B-Instruct-v0.1",
#     huggingfacehub_api_token="votre_api_token_ici",
    huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN"),
#    model_kwargs={"temperature": 0.5, "max_new_tokens": 500}
    temperature=0.5,
    max_new_tokens=500
)
# llm = HuggingFaceHub(
#    repo_id="deepseek-ai/deepseek-coder-6.7b-instruct",
#    model_kwargs={"temperature": 0.5, "max_new_tokens": 500}
# ) #pour utiliser DeepSeek

## Créez un agent
agent = Agent(
    role="Assistant",
    goal="Aider à la formation d'ingénieur informatique",
    backstory="Je suis un assistant IA spécialisé dans l'aide aux étudiants en ingénierie informatique.",
    verbose=True,
    llm=llm  # Intégration du modèle
)

## Créez une tâche
task = Task(
    description="Expliquer le concept de programmation orientée objet avec des exemples principalement en Python",
    agent=agent
)

## Créez un équipage avec l'agent
crew = Crew(
    agents=[agent],
    tasks=[task],
    process=Process.sequential,
    verbose=True
)

## Exécutez le processus
# process = Process(crew)

# result = process.run()
result = crew.kickoff()
# result = crew.run()
print(result)
