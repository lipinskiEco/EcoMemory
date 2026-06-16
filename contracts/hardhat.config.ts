import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';
import * as dotenv from 'dotenv';

dotenv.config();

const ARC_TESTNET_RPC = process.env.ARC_TESTNET_RPC || 'https://rpc.testnet.arc.network';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.26',
    settings: {
      evmVersion: 'cancun',
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    arcTestnet: {
      url: ARC_TESTNET_RPC,
      chainId: Number(process.env.ARC_TESTNET_CHAIN_ID || 5042002),
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      arcTestnet: process.env.ARC_TESTNET_EXPLORER_API_KEY || '',
    },
    customChains: [
      {
        network: 'arcTestnet',
        chainId: Number(process.env.ARC_TESTNET_CHAIN_ID || 5042002),
        urls: {
          apiURL: process.env.ARC_TESTNET_EXPLORER_API_URL || 'https://testnet.arcscan.app/api',
          browserURL: process.env.ARC_TESTNET_EXPLORER_URL || 'https://testnet.arcscan.app',
        },
      },
    ],
  },
};

export default config;
