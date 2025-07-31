#!/bin/bash

# clone or update the xlayer-erigon repository
if [ -d "xlayer-erigon" ]; then
    echo "xlayer-erigon directory already exists. Skipping clone."
    cd xlayer-erigon
    git pull
    git checkout dumi/devnet
    cd test
else
    echo "Cloning xlayer-erigon repository..."
    git clone -b dumi/devnet https://github.com/okx/xlayer-erigon.git
    cd xlayer-erigon/test
fi
# stop existing instances
make stop
make clean
# start X Layer devnet
make min-run
echo "Waiting for X Layer devnet to start (15 seconds)..."
sleep 15
# send 1000 OKB to the deployer account
cast send 0x3784Fe4C992871AdCC85dfee2B593bA3253Acc79 --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8123
cast send 0x3784Fe4C992871AdCC85dfee2B593bA3253Acc79 --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8124
# send 1000 OKB to the user account
cast send 0x0412e09725F94B0147F359351221420D389a660F --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8123
cast send 0x0412e09725F94B0147F359351221420D389a660F --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8124
# send 1000 OKB to the user account
cast send 0xcf7EE1A44134DEF9a4940be2368d2Ce8366C6F65 --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8123
cast send 0xcf7EE1A44134DEF9a4940be2368d2Ce8366C6F65 --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8124