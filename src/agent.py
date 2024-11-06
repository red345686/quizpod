from uagents import Agent, Context, Model
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class ContextPrompt(Model):
    context: str
    text: str

class Response(Model):
    text: str

# Use environment variables for sensitive data
agent_name = os.getenv("AGENT_NAME", "default_user")
endpoint_url = os.getenv("AGENT_ENDPOINT")
api_key = os.getenv("API_KEY")

agent = Agent(
    name=agent_name,
    endpoint=endpoint_url,
)

@agent.on_event("startup")
async def send_message(ctx: Context):
    subject = ctx.data.get("subject", "kanto")  # Default to "kanto" if no subject is provided
    with open(f"{subject}.json", "r") as f:
        data = json.load(f)
    prompt = ContextPrompt(
        context=f"Generate a list of quiz questions for the {subject.capitalize()} Pokemon quiz.",
        text=json.dumps(data)
    )
    response = await ctx.send(api_key, prompt)
    ctx.logger.info(f"Received response from agent: {response.text}")
    return response.text

if __name__ == "__main__":
    agent.run()
