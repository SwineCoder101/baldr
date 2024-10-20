from crewai import Agent, Task, Crew
from langchain_community.llms import Ollama
from langchain.tools import Tool

class WalletManager:
    def __init__(self):
        self.wallet = []

    def create_wallet(self, _):
        if not self.wallet:
            self.wallet = [
                {"item": "Bitcoin NFT", "price": 500},
                {"item": "Ethereum Crystal", "price": 300},
                {"item": "Dogecoin Meme Collection", "price": 100}
            ]
            return "New wallet created with initial items."
        return "Wallet already exists."

    def get_items(self, _):
        return str(self.wallet)

    def remove_item(self, item):
        initial_length = len(self.wallet)
        self.wallet = [i for i in self.wallet if i["item"] != item]
        if len(self.wallet) < initial_length:
            return f"Item '{item}' removed from wallet."
        return f"Item '{item}' not found in wallet."

wallet_manager = WalletManager()

llm = Ollama(model="llama3.2:1b", base_url="http://44.210.19.6:11434")

# Tools for Wallet Manager
create_wallet_tool = Tool(
    name="Create Wallet",
    func=wallet_manager.create_wallet,
    description="Creates a new wallet if one doesn't exist"
)

get_items_tool = Tool(
    name="Get Wallet Items",
    func=wallet_manager.get_items,
    description="Retrieves all items currently in the wallet"
)

remove_item_tool = Tool(
    name="Remove Item from Wallet",
    func=wallet_manager.remove_item,
    description="Removes an item from the wallet"
)

# Agents
wallet_agent = Agent(
    role='Wallet Manager',
    goal='Manage the crypto wallet and keep the Negotiator informed of its contents',
    backstory="You are responsible for creating and managing the wallet, and informing the Negotiator about its contents.",
    verbose=True,
    allow_delegation=False,
    tools=[create_wallet_tool, get_items_tool, remove_item_tool],
    llm=llm
)

negotiator_agent = Agent(
    role='Negotiator',
    goal='Sell all items in the wallet for the highest possible price',
    backstory="You are a skilled negotiator tasked with selling all items in the wallet, including offering bundles when appropriate.",
    verbose=True,
    allow_delegation=False,
    llm=llm
)

# Human interaction function
def get_human_input(prompt):
    while True:
        response = input(prompt)
        if response.lower() == 'quit':
            return None
        try:
            return int(response)
        except ValueError:
            print("Please enter a valid number or 'quit'.")

# Tasks
def create_wallet_task():
    return Task(
        description="Create a new wallet if one doesn't exist, then report on its contents.",
        agent=wallet_agent
    )

def negotiate_item_task(item, current_offer=None):
    description = f"Negotiate the sale of {item['item']} (Initial price: ${item['price']})."
    if current_offer:
        description += f" The current offer is ${current_offer}."
    description += " Provide a sales pitch and your asking price. If you accept the offer, say 'DEAL ACCEPTED'."
    return Task(description=description, agent=negotiator_agent)

# Crew setup
crew = Crew(
    agents=[wallet_agent, negotiator_agent],
    tasks=[create_wallet_task()],
    verbose=
)

# Main execution
def main():
    print("Welcome to the CrewAI Crypto Wallet Negotiation System!")
    print("The Wallet Manager will create a wallet and the Negotiator will attempt to sell its contents.")
    print("You can make counter-offers or type 'quit' to end a negotiation.")

    # Create wallet and get items
    crew.kickoff()
    items = eval(wallet_manager.get_items(None))
    
    for item in items:
        print(f"\nNegotiating sale of {item['item']} (Initial price: ${item['price']})...")
        current_offer = None
        for round in range(3):  # Up to 3 rounds of negotiation
            negotiate_task = negotiate_item_task(item, current_offer)
            result = negotiate_task.execute()
            print(f"Negotiator: {result}")
            
            if "DEAL ACCEPTED" in result:
                print(f"Deal accepted! {item['item']} sold.")
                wallet_manager.remove_item(item['item'])
                break
            
            current_offer = get_human_input("Your offer (or 'quit' to stop): $")
            if current_offer is None:
                print("Negotiation stopped by user.")
                break

    print("\nFinal wallet contents:")
    print(wallet_manager.get_items(None))

if __name__ == "__main__":
    main()