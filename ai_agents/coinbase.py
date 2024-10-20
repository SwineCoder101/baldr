from cdp import *

api_key_name = "organizations/faee28e5-95a9-4b3e-bf7f-0d140cd62b8a/apiKeys/1efd9d57-287f-4f71-8da2-fa619a0dcd53"

api_key_private_key = "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEILLUquT9SysqKr9Fc2FoUJpnHzf5V6O0LaXTUJxqjpRcoAoGCCqGSM49\nAwEHoUQDQgAEMTU75Cuu+Kg5GEVrBIFSWvQlJ7TlWC43SikYx8v1bZwEXgKhW/Ha\nL2LmH2BisgSI7IdymHGViRsrAzpJD5Np/w==\n-----END EC PRIVATE KEY-----\n"

Cdp.configure(api_key_name, api_key_private_key)

print("CDP SDK has been successfully configured with CDP API key.")

# Create a wallet with one address by default.
wallet1 = Wallet.create()

print(type(wallet1))
# A wallet has a default address.
address = wallet1.default_address
print("ADDRESS: "+ str(address))

print(f"Wallet successfully created: {wallet1}")

faucet_tx = wallet1.faucet()

print(f"Faucet transaction successfully completed: {faucet_tx}")