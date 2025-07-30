# ExFuSwap
## Extended Crypto Swap to EVM and Non-EVM Blockchains using 1inch Fusion+ Technology

## How to run ExFuSwap

To run the app, please see the [README.md](app/README.md).


## Build Dependencies

```
cd modules/fusion-sdk
npm install --force
npm run build
npm pack
npm test
cd modules/cross-chain-sdk
npm install --force
npm run build
npm pack
npm test
```

## Useful Links

[X Layer Network Info](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)

[Etherlink Network Info](https://docs.etherlink.com/get-started/network-information)