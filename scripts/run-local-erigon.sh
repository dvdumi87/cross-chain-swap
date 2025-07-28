#!/bin/bash

killall -9 erigon
sleep 3
rm -rf dev1 dev2

./erigon --dev.period=1 --datadir=dev1 --chain=dev --private.api.addr=localhost:9090 --mine --http.api=eth,erigon,web3,net,debug,trace,txpool,parity,admin --http.corsdomain="*" --http.port=8123 --torrent.trackers.disable=true --nodiscover=true > log1.txt 2>&1 &

./erigon --dev.period=1 --datadir=dev2 --chain=dev --private.api.addr=localhost:9091 --mine --http.api=eth,erigon,web3,net,debug,trace,txpool,parity,admin --http.corsdomain="*" --http.port=8124 --torrent.trackers.disable=true --torrent.port=43069 --nodiscover=true > log2.txt 2>&1 &