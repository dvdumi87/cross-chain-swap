import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.23',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      },
      viaIR: true,
    },
  },
  networks: {
    local1: {
      url: "http://localhost:8123",
      accounts: ["0x26e86e45f6fc45ec6e2ecd128cec80fa1d1505e5507dcd2ae58c3130a7a97b48", "0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8"],
      gasPrice: process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : undefined,
    },
    local2: {
      url: "http://localhost:8124",
      accounts: ["0x26e86e45f6fc45ec6e2ecd128cec80fa1d1505e5507dcd2ae58c3130a7a97b48", "0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8"],
      gasPrice: process.env.GAS_PRICE ? parseInt(process.env.GAS_PRICE) : undefined,
    },
    etherlinktest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    xlayertestnet: {
      url: "https://testrpc.xlayer.tech",
      accounts: [process.env.PRIVATE_KEY || ""],
      gasPrice: 10000000000,
    },
    xlayerdevnet: {
      url: "http://localhost:8123",
      accounts: [process.env.PRIVATE_KEY || ""],
      gasPrice: 1
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/public",
      accounts: [process.env.PRIVATE_KEY || ""]
    }
  }
};

export default config;
