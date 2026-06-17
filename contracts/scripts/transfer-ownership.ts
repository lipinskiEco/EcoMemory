import { http, createPublicClient, createWalletClient, type Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import 'dotenv/config';

async function main() {
  const rpc = process.env.ARC_TESTNET_RPC || 'https://rpc.testnet.arc.network';
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error('PRIVATE_KEY not set');

  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const publicClient = createPublicClient({ transport: http(rpc) });
  const walletClient = createWalletClient({ account, transport: http(rpc) });

  const contractAddress = '0x8ffbf6bed8e989688a9bf15203697f87cb63dd2a' as Address;
  const newOwner = '0x9717eda3366b6de2e38547a4cf5214f0bf3ef7ea' as Address;

  const abi = [
    { type: 'function', name: 'owner', outputs: [{ type: 'address' }], stateMutability: 'view' },
    { type: 'function', name: 'transferOwnership', inputs: [{ type: 'address', name: 'newOwner' }], stateMutability: 'nonpayable' },
  ] as const;

  console.log('Current owner:', account.address);
  console.log('Transferring ownership to:', newOwner);

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: 'transferOwnership',
    args: [newOwner],
  });
  console.log('Transfer tx hash:', hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 120000 });
  console.log('Transfer status:', receipt.status);

  const owner = await publicClient.readContract({ address: contractAddress, abi, functionName: 'owner' });
  console.log('New owner:', owner);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
