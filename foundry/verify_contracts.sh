#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Check if POLYGONSCAN_API_KEY is set
if [ -z "$POLYGONSCAN_API_KEY" ]; then
  echo "Error: POLYGONSCAN_API_KEY is not set."
  exit 1
fi

# Check if RPC_URL is set
if [ -z "$RPC_URL" ]; then
  echo "Error: RPC_URL is not set."
  exit 1
fi

# Escrow contract verification
forge verify-contract \
  --num-of-optimizations 200 \
  --watch \
  --etherscan-api-key $POLYGONSCAN_API_KEY \
  0x652eB64EaFf175B56b596Aa5708C998148ABf745 \
  src/Escrow.sol:Escrow \
  --verifier oklink \
  --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/POLYGON_ZKEVM_TESTNET \
  --api-key $OKLINK_API_KEY

# Token contract verification
# https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/POLYGON
forge verify-contract \
  --num-of-optimizations 200 \
  --watch \
  --etherscan-api-key $POLYGONSCAN_API_KEY \
  0xF6b0F3c1c6F1961d8A4ea2158eC99BC30E2a03D4 \
  src/Token.sol:Token \
  --verifier oklink \
  --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/POLYGON_ZKEVM_TESTNET \
  --api-key $OKLINK_API_KEY


forge script ./script/Deploy.s.sol:TokenScript \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --verifier blockscout \
  --verifier-url https://zkevm.blockscout.com/api/ \
  --legacy



forge script ./script/Deploy.s.sol:TokenScript \
  --rpc-url $AMOY_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify \
  --verifier oklink \
  --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/POLYGON_ZKEVM_TESTNET \
  --legacy

# forge verify-contract <the_contract_address>
#       src/MyToken.sol:MyToken  
#       --verifier oklink 
#       --verifier-url oklinkverifyUrl
#       --api-key oklinkApiKey