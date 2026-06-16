const { createPublicClient, http } = require('viem');

const client = createPublicClient({
  transport: http('https://rpc.testnet.arc.network'),
  chain: {
    id: 5042002,
    name: 'ARC Testnet',
    network: 'arc-testnet',
    nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 },
    rpcUrls: { default: { http: ['https://rpc.testnet.arc.network'] } },
  },
});

async function main() {
  const hash = '0xc72dee7b7e45538c2d3c308e379a079387fb76b96a070ae52ef4b08f4003da78';
  const receipt = await client.getTransactionReceipt({ hash });
  console.log('Contract address:', receipt.contractAddress);
  console.log('Status:', receipt.status);
  console.log('Block number:', receipt.blockNumber.toString());
  console.log('Gas used:', receipt.gasUsed.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
