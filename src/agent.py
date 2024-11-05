from uagents import Agent, Context, Model
import json

class ContextPrompt(Model):
    context: str
    text: str

class Response(Model):
    text: str

agent = Agent(
    name="user",
    endpoint="http://localhost:8000/submit",
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
    response = await ctx.send("agent1q0h70caed8ax769shpemapzkyk65uscw4xwk6dc4t3emvp5jdcvqs9xs32y", prompt)
    ctx.logger.info(f"Received response from agent: {response.text}")
    return response.text

if __name__ == "__main__":
    agent.run()