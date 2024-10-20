#!/bin/bash

# Load environment variables from .env file
# export $(grep -v '^#' .env | xargs)
source .env

forge script ./script/Simulate.s.sol:SimulateScript \
  --rpc-url $AMOY_RPC_URL \
  --private-key $SIMULATOR\
  --broadcast \
  --legacy

