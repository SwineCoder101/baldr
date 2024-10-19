!#/bin/bash

source ../../.env

forge script Deploy.s.sol:TokenScript --rpc-url $RPC_URL --private-key $PRIVATE_KEY --verify --etherscan-api-key $ETHERSCAN_API_KEY --chain-id 80001


forge create \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  Deploy.s.sol:TokenScript \
  --verify \
  --verifier blockscout \
  --verifier-url https://polygon.blockscout.com/api/