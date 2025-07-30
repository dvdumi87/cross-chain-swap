#!/bin/bash

# clone or update the xlayer-erigon repository
if [ -d "xlayer-erigon" ]; then
    echo "xlayer-erigon directory already exists. Skipping clone."
    cd xlayer-erigon
    git checkout dev
    git pull
    cd test
else
    echo "Cloning xlayer-erigon repository..."
    git clone -b dev https://github.com/okx/xlayer-erigon.git
    cd xlayer-erigon/test
fi
# stop existing instances
make stop
# start X Layer devnet
make min-run
sleep 5
# send 1000 OKB to the deployer account
cast send 0x3784Fe4C992871AdCC85dfee2B593bA3253Acc79 --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8123
# send 1000 OKB to the user account
cast send 0x0412e09725F94B0147F359351221420D389a660F --value 1000000000000000000000 \
--private-key 0x815405dddb0e2a99b12af775fd2929e526704e1d1aea6a0b4e74dc33e2f7fcd2 \
--legacy --gas-price 1 \
--rpc-url http://localhost:8123