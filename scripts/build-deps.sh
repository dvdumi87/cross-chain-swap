#!/bin/bash

nvm use v22

ROOT_DIR=$(git rev-parse --show-toplevel)

cd $ROOT_DIR
cd modules/limit-order-sdk
npm install --force
npm run build
npm test

cd $ROOT_DIR
cd modules/fusion-sdk
npm install --force
npm run build
npm test

cd $ROOT_DIR
cd modules/cross-chain-sdk
npm install --force
npm run build
npm test

cd $ROOT_DIR
cd modules/cross-chain-resolver-example
npm install --force