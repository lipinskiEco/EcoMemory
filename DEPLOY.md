# EcoMemory — Deploy your own contract

Deploy the EcoMemory contract from **your wallet** on ARC Testnet.

---

## 1. Get ARC Testnet USDC

- Network: **ARC Testnet**
- Chain ID: `5042002`
- RPC: `https://rpc.testnet.arc.network`
- USDC: `0x3600000000000000000000000000000000000000`
- Faucet: https://faucet.circle.com/

Add the network to your wallet (MetaMask / Rabby) and request test USDC.

---

## 2. Configure environment

Copy the example file and fill in **your** values:

```bash
cd contracts
cp .env.example .env
```

Edit `contracts/.env`:

```env
ARC_TESTNET_RPC=https://rpc.testnet.arc.network
ARC_TESTNET_CHAIN_ID=5042002
USDC_ADDRESS=0x3600000000000000000000000000000000000000
NEXT_PUBLIC_USDC_ADDRESS=0x3600000000000000000000000000000000000000

# Your private key (with the 0x prefix)
PRIVATE_KEY=0x...

# Your wallet address (will own the contract and receive donations/trees split)
CONTRACT_OWNER=0xYOUR_ADDRESS
TREE_FUND_RECIPIENT=0xYOUR_ADDRESS
```

> Never commit `.env`. It is already in `.gitignore`.

---

## 3. Compile and test

```bash
cd contracts
npm install
npm run compile
npm run test
npm run lint
```

---

## 4. Deploy

```bash
cd contracts
npx tsx scripts/deploy-viem.ts
```

The script will:
- Deploy the contract from your wallet.
- Transfer ownership to `CONTRACT_OWNER`.
- Set the tree-fund recipient to `TREE_FUND_RECIPIENT`.
- Write the address to `frontend/.env.local`.

Save the printed contract address.

---

## 5. Verify the contract (optional)

```bash
cd contracts
npx hardhat verify --network arcTestnet <YOUR_CONTRACT_ADDRESS> \
  0x3600000000000000000000000000000000000000 \
  <TREE_FUND_RECIPIENT> \
  <CONTRACT_OWNER>
```

If the explorer asks for an API key, use a dummy value:

```bash
$env:ARC_TESTNET_EXPLORER_API_KEY='dummy'
npx hardhat verify --network arcTestnet <YOUR_CONTRACT_ADDRESS> ...
```

---

## 6. Run the frontend locally

```bash
cd frontend
npm install
npm run dev
```

The contract address should already be in `frontend/.env.local` from step 4.

Open http://localhost:3000, connect your wallet, and mint a memorial.

---

## 7. Deploy the frontend to Vercel

Set this environment variable in the Vercel dashboard:

```env
NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS=<YOUR_CONTRACT_ADDRESS>
```

Then redeploy.

---

## Done

After these steps the contract is fully under your wallet and the frontend can mint/donate through it.
