import { http, createPublicClient, createWalletClient, type Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { ECOMEMORY_DEPLOY_ABI, ECOMEMORY_BYTECODE } from '../../frontend/lib/contractDeploy';

async function main() {
  const rpc = process.env.ARC_TESTNET_RPC || 'https://rpc.testnet.arc.network';
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error('PRIVATE_KEY not set');

  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const publicClient = createPublicClient({ transport: http(rpc) });
  const walletClient = createWalletClient({ account, transport: http(rpc) });

  const paymentToken = (process.env.NEXT_PUBLIC_USDC_ADDRESS || process.env.USDC_ADDRESS) as Address;
  if (!paymentToken) throw new Error('USDC_ADDRESS not set');
  const treeFundRecipient = (process.env.TREE_FUND_RECIPIENT || account.address) as Address;
  const owner = (process.env.CONTRACT_OWNER || account.address) as Address;

  console.log('Deployer:', account.address);
  console.log('USDC:', paymentToken);
  console.log('Tree fund:', treeFundRecipient);
  console.log('Owner:', owner);

  const nonce = await publicClient.getTransactionCount({ address: account.address, blockTag: 'pending' });
  console.log('Using nonce:', nonce);

  const hash = await walletClient.deployContract({
    abi: ECOMEMORY_DEPLOY_ABI,
    bytecode: ECOMEMORY_BYTECODE,
    args: [paymentToken, treeFundRecipient, owner],
    nonce,
  });
  console.log('Deploy tx hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120000 });
  console.log('Deploy status:', receipt.status);
  console.log('Contract address:', receipt.contractAddress);

  const rootDir = path.resolve(__dirname, '..');
  const artifactPath = path.join(rootDir, 'ecomemory-deployment.json');
  fs.writeFileSync(
    artifactPath,
    JSON.stringify(
      {
        contractName: 'EcoMemory',
        network: 'arcTestnet',
        address: receipt.contractAddress,
        paymentToken,
        treeFundRecipient,
        owner,
        deployedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
  console.log('Deployment artifact saved:', artifactPath);

  const envPath = path.resolve(rootDir, '..', 'frontend', '.env.local');
  const envContent = `NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS=${receipt.contractAddress}\nNEXT_PUBLIC_USDC_ADDRESS=${paymentToken}\n`;
  fs.writeFileSync(envPath, envContent);
  console.log('Frontend env updated:', envPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
