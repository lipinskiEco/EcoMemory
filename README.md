# EcoMemory

<p align="center">
  <img src="frontend/public/logo.svg" width="80" alt="EcoMemory logo" />
</p>

<p align="center">
  <strong>On-chain memorials that plant trees.</strong>
</p>

EcoMemory is a decentralized memorial platform built on **ARC Testnet**. It lets anyone create a permanent, shareable NFT tribute for a loved one, a pet, or a meaningful cause. Each memorial costs only **$0.10 USDC** to mint and gets a beautiful page with a QR code. Visitors can leave micro-donations of **$0.05–$0.10 USDC**, which are automatically split **50/50** between the memorial beneficiary and a tree-planting fund.

## The idea

Traditional memorials are physical, expensive, and limited by geography. EcoMemory turns remembrance into a living, digital garden:

- **Permanent** — stored on-chain, forever accessible.
- **Meaningful** — every memorial supports both remembrance and reforestation.
- **Transparent** — the smart contract enforces the 50/50 split, no hidden fees.
- **Shareable** — each memorial has a unique QR code page that anyone can visit.

## Why ARC Testnet?

EcoMemory is built on ARC Testnet because it aligns with the project values:

- **Low environmental footprint** — efficient consensus reduces energy use.
- **Near-zero fees** — micro-donations only make sense when fees are tiny.
- **USDC-native gas** — ARC uses USDC for gas, making the experience familiar.
- **Fast finality** — visitors can donate and see results quickly.

## Live demo

- **Frontend:** https://ecomemory-arc.vercel.app
- **Network:** ARC Testnet (Chain ID 5042002)
- **Explorer:** https://testnet.arcscan.app

> The frontend requires a manually deployed EcoMemory contract. See the deployment section below to deploy your own contract from your wallet and set the address in your environment.

## How it works

1. **Mint** — Connect a wallet on ARC Testnet, approve 0.10 USDC, and fill in the memorial details.
2. **Share** — Each memorial gets a unique page with a QR code.
3. **Donate** — Visitors leave micro-donations of $0.05–$0.10 USDC.
4. **Impact** — 50% goes to the memorial beneficiary, 50% funds tree planting.

## Stack

- **Smart contracts:** Solidity + Hardhat + Viem
- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + Wagmi/Viem
- **Wallet:** Injected wallet connector (MetaMask, Rabby, etc.)
- **Network:** ARC Testnet

## Repository structure

```
EcoMemory/
├── contracts/        # Hardhat project
│   ├── contracts/    # Solidity contracts
│   ├── test/         # Hardhat tests
│   └── scripts/      # Utility scripts
├── frontend/         # Next.js app
│   ├── app/          # Pages
│   ├── components/   # UI components
│   └── lib/          # Contract ABI & Wagmi config
├── .env.example
├── LICENSE
└── README.md
```

## Prerequisites

- Node.js 20+
- npm
- A wallet with ARC Testnet configured and some test USDC for gas
- USDC on ARC Testnet (faucet: https://faucet.circle.com/)

### ARC Testnet network details

- Chain ID: `5042002`
- RPC: `https://rpc.testnet.arc.network`
- Explorer: `https://testnet.arcscan.app`
- USDC ERC-20: `0x3600000000000000000000000000000000000000` (6 decimals)
- Gas token: native USDC (18 decimals)

## Quick start

### 1. Compile and test the contract

```bash
cd contracts
npm install
cp .env.example .env
# edit .env with your ARC Testnet RPC, USDC address, and wallet details
npm run compile
npm run test
npm run lint
```

.### 2. Deploy the contract manually

See the step-by-step guide in **[DEPLOY.md](./DEPLOY.md)**.

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`, connect your wallet on ARC Testnet, and mint a
memorial.

### 4. Deploy to Vercel

Set the environment variable `NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS` to your
deployed contract address in the Vercel dashboard.

## Important security notes

- Never commit `.env`, `.env.local`, or private keys.
- Only deploy the contract from a wallet you control.
- The contract owner and tree-fund recipient can be configured independently.

## License

MIT
