import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";

import { gweiToWei } from "./utils";

// Plugins:
import "solidity-coverage";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-typechain";
import "hardhat-gas-reporter";
import { removeConsoleLog } from "hardhat-preprocessor";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

// Optimism plugins:
import "@eth-optimism/plugins/hardhat/compiler";
import "@eth-optimism/plugins/hardhat/ethers";

const config: HardhatUserConfig = {
  networks: {
    kovan: {
      url: "https://kovan.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
    },

    ropsten: {
      url: "https://ropsten.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
    },

    mainnet: {
      url: "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
      gasPrice: gweiToWei(process.env.GWEI_GAS_PRICE ?? "30"),
    },
  },

  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },

  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== "hardhat" && bre.network.name !== "localhost"
    ),
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },

  typechain: {
    target: "ethers-v5",
  },

  gasReporter: {
    currency: "USD",
    gasPrice: parseInt(process.env.GWEI_GAS_PRICE ?? "20"),
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};

export default config;
