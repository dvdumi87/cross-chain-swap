#!/bin/bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v22

# Set root directory
ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR
if [ ! -f ".env" ]; then
    echo "Please create .env file from .example.env"
    exit 1
fi
cp .env aux/test-token-erc20/.env

# Deploy contracts
cd aux/test-token-erc20
npm install
npx hardhat run scripts/deploy-weth.ts --network xlayerdevnet
npx hardhat run scripts/deploy-usdc.ts --network xlayerdevnet
npx hardhat run scripts/deploy-weth.ts --network xlayerdevnet2
npx hardhat run scripts/deploy-usdc.ts --network xlayerdevnet2

cp .env ../limit-order-protocol/.env
cd ../limit-order-protocol
npm install
npx hardhat run scripts/deploy.ts --network xlayerdevnet
npx hardhat run scripts/deploy.ts --network xlayerdevnet2