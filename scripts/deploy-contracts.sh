#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v22

# Set root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR

# Deploy contracts
cd aux/test-token-erc20
npm install
npx hardhat run scripts/deploy-weth.ts --network xlayerdevnet
npx hardhat run scripts/deploy-usdc.ts --network xlayerdevnet
npx hardhat run scripts/deploy-weth.ts --network xlayerdevnet2
npx hardhat run scripts/deploy-usdc.ts --network xlayerdevnet2