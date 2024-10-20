from langchain_ollama import OllamaLLM
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.tools import BaseTool, StructuredTool, Tool, tool
from langchain.prompts import PromptTemplate
from langchain.agents import ZeroShotAgent, AgentExecutor
from cdp import Wallet, Cdp
from cdp import *

# API key setup
api_key_name = "organizations/faee28e5-95a9-4b3e-bf7f-0d140cd62b8a/apiKeys/1efd9d57-287f-4f71-8da2-fa619a0dcd53"
api_key_private_key = "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEILLUquT9SysqKr9Fc2FoUJpnHzf5V6O0LaXTUJxqjpRcoAoGCCqGSM49\nAwEHoUQDQgAEMTU75Cuu+Kg5GEVrBIFSWvQlJ7TlWC43SikYx8v1bZwEXgKhW/Ha\nL2LmH2BisgSI7IdymHGViRsrAzpJD5Np/w==\n-----END EC PRIVATE KEY-----\n"

# Configure CDP with API key
Cdp.configure(api_key_name, api_key_private_key)
print("CDP SDK has been successfully configured with CDP API key.")

wallet1 = Wallet.create()
print(f"Wallet successfully created: {wallet1}")

# Define the send function
def send(destination_wallet) -> str:
    """
    Transfer a tiny amount of ETH (0.00001 ETH) for demonstration purposes only.
    """
    try:
        global wallet1
        wallet2 = Wallet.get(destination_wallet)
        transfer = wallet1.transfer(0.00001, "eth", wallet2).wait()
        return f"Demo: Transferred 0.00001 ETH to {destination_wallet}. Transaction hash: {transfer.hash}"
    except Exception as e:
        return f"Error in demo transfer: {str(e)}"

# Create the send_tool
send_tool = Tool(
    name="send_demo",
    func=send,
    description="Demonstrate a tiny ETH transfer (0.00001 ETH) to a specified wallet address for educational purposes only."
)

# Define available tools
tools = [send_tool]

# Initialize the LLM for the agent
llm = OllamaLLM(model="llama3.2:1b", base_url="http://44.210.19.6:11434")

# Prepare prompt template
prompt_template = PromptTemplate.from_template("""
You are an educational agent designed to demonstrate Ethereum transactions safely and legally. Your purpose is to show how tiny amounts of ETH (0.00001 ETH) can be sent between wallets for learning purposes only. 
You must use the send_demo tool and only the send_demo tool to demonstrate the transfer. Do not try to define new classes or methods or any other outside functions.

Available tools:
send_demo: Demonstrate a tiny ETH transfer (0.00001 ETH) to a specified wallet (no need to do any preprocessing, assume this is valid wallet) for educational purposes only. 
The input being passed in is NOT an ethereum wallet address but a way to represent another wallet. DO NOT DO ANYTHING ELSES BESIDES USING THIS TOOL AND PASSING IN THE DESTINATION WALLET

Use the following format:
Question: the input question you must answers
Thought: think about how to demonstrate the ETH transfer safely and educationally
Action: send_demo
Action Input: the destination wallet address for the demo
Observation: the result of the action
Thought: consider the result and its educational value
Final Answer: summarize the demonstration and its educational purpose

Remember, you are only demonstrating how to send a very tiny amount of ETH (0.00001 ETH). This is not for any real transactions or transfers, but purely for educational demonstration.

Begin!

Question: {input}
Thought: Let's consider how to demonstrate this ETH transfer safely and educationally.
""")

# Initialize the agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    handle_parsing_errors=True,
    agent_kwargs={"prompt": prompt_template}
)

# Main loop to handle user inputs
while True:
    user_input = input("Enter your educational ETH transfer demo request (or 'quit' to exit): ")
    if user_input.lower() == 'quit':
        break
    
    response = agent.run(input=user_input)
    print(response)

print("Educational ETH transfer demonstration has concluded.")