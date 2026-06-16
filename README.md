# EcoMemory

On-chain memorial NFTs for ARC Testnet.

Mint a living memorial page for **$0.10 USDC**. Each memorial gets a QR code that
links to a shareable page. Visitors can leave a micro-donation of **$0.05–$0.10
USDC**, which is split 50/50 between the memorial fund and a tree-planting fund.

## Stack

- **Smart contracts:** Solidity + Hardhat + Viem
- **Frontend:** Next.js + TypeScript + Tailwind CSS + Wagmi/Viem
- **Wallet:** Injected wallet connector (MetaMask, Rabby, etc.)
- **Network:** ARC Testnet

## Repository structure

```
EcoMemory/
├── contracts/        # Hardhat project
│   ├── contracts/    # Solidity contracts
│   ├── test/         # Hardhat tests
│   └── scripts/      # Deploy script
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

### 1. Install dependencies

```bash
# Contracts
cd contracts
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and `.env.local` in both `contracts/` and `frontend/`,
fill in the ARC Testnet RPC, USDC address, and keys.

### 3. Compile and test the contract

```bash
cd contracts
npm run compile
npm run test
npm run lint
```

### 4. Deploy the contract

The contract must be deployed **from your wallet**. Choose one of the methods
below.

#### Browser deployment (recommended)

1. Run the frontend locally:

```bash
cd frontend
npm run dev
```

2. Open `http://localhost:3000/deploy`.
3. Connect your wallet on ARC Testnet.
4. Fill in the USDC address, tree fund recipient, and contract owner.
5. Click **Deploy EcoMemory from wallet** and confirm the transaction.
6. Copy the deployed contract address into `frontend/.env.local` as
   `NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS` and restart the dev server.

#### Hardhat deployment

The deploy script reads the private key from `PRIVATE_KEY` in `contracts/.env`.

```bash
cd contracts
cp .env.example .env
# edit .env with your RPC, USDC address, and PRIVATE_KEY
npm run deploy:arc-testnet
```

After deployment, the script writes the contract address to:

- `contracts/ecomemory-deployment.json`
- `frontend/.env.local`

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000`, connect your wallet on ARC Testnet, and mint a
memorial.

## Deployment verification

After deploying, verify the contract address in `ecomemory-deployment.json` and
ensure it matches the explorer. The frontend reads the contract address from
`NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS`.

## Important security notes

- Never commit `.env` or private keys.
- The deploy script only uses the deployer's private key.
- The contract owner and tree-fund recipient can be configured independently.

## License

MIT
