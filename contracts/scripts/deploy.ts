import hre from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

/**
 * @title EcoMemory Deploy Script
 * @notice Deploys the EcoMemory contract to the configured network.
 *         The deployer must be funded with ARC Testnet gas tokens.
 */
async function main() {
  const network = hre.network;
  const [deployer] = await hre.viem.getWalletClients();

  const deployerAddress = deployer.account.address;
  console.log('Deploying EcoMemory with account:', deployerAddress);
  console.log('Network:', network.name);

  const paymentToken = process.env.NEXT_PUBLIC_USDC_ADDRESS || process.env.USDC_ADDRESS;
  if (!paymentToken) {
    throw new Error('USDC_ADDRESS or NEXT_PUBLIC_USDC_ADDRESS not set in environment');
  }

  const treeFundRecipient = process.env.TREE_FUND_RECIPIENT || deployerAddress;
  const owner = process.env.CONTRACT_OWNER || deployerAddress;

  const EcoMemory = await hre.viem.deployContract('EcoMemory', [
    paymentToken,
    treeFundRecipient,
    owner,
  ]);

  console.log('EcoMemory deployed to:', EcoMemory.address);
  console.log('Payment token:', paymentToken);
  console.log('Tree fund recipient:', treeFundRecipient);
  console.log('Owner:', owner);

  // Write deployment artifact for the frontend.
  const rootDir = path.resolve(__dirname, '..');
  const artifactPath = path.join(rootDir, 'ecomemory-deployment.json');
  fs.writeFileSync(
    artifactPath,
    JSON.stringify(
      {
        contractName: 'EcoMemory',
        network: network.name,
        address: EcoMemory.address,
        paymentToken,
        treeFundRecipient,
        owner,
        deployedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
  console.log('Deployment artifact saved to:', artifactPath);

  // Also write the contract address for the frontend .env usage.
  const envPath = path.resolve(rootDir, '..', 'frontend', '.env.local');
  const envContent = `NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS=${EcoMemory.address}\nNEXT_PUBLIC_USDC_ADDRESS=${paymentToken}\n`;
  fs.writeFileSync(envPath, envContent);
  console.log('Frontend env updated:', envPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
