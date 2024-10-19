#!/bin/bash

# This script deploys the vault contract to the blockchain.
# source .env

# CHAIN_ID=80002
# ETHERSCAN_API_KEY=YFVKAZ13MC7AH6BW8KXWS9D55TJ3154QIC
# DEPLOYER_ADDRESS="0x167d9b14C36EB55492faF39dD1f2ABe943f4bAb5"
#!/bin/bash

# 필수 환경변수 설정
# .env 파일에서 환경 변수 불러오기
export $(grep -v '^#' .env | xargs)

# Escrow 컨트랙트 검증
forge verify-contract \
  --num-of-optimizations 200 \
  --watch \
  --etherscan-api-key $POLYGONSCAN_API_KEY \
  --rpc-url $RPC_URL \
  0x77f6398649832754Ac50c87E07aF65434986A66F \
  src/Escrow.sol:Escrow \

# Token 컨트랙트 검증
forge verify-contract \
  --num-of-optimizations 200 \
  --watch \
  --etherscan-api-key $POLYGONSCAN_API_KEY \
  --rpc-url $RPC_URL \
  0x7199547bedf4C05dA14Bc3296c66c393d1358efB \
  src/Token.sol:Token\

