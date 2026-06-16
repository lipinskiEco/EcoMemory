'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWalletClient, useChainId } from 'wagmi';
import { isAddress, zeroAddress } from 'viem';
import { deployContract } from 'viem/actions';
import { ECOMEMORY_DEPLOY_ABI, ECOMEMORY_BYTECODE } from '@/lib/contractDeploy';
import { ConnectButton } from '@/components/ConnectButton';
import { ARC_TESTNET } from '@/lib/contract';

export default function DeployPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const [usdc, setUsdc] = useState('');
  const [treeFund, setTreeFund] = useState('');
  const [owner, setOwner] = useState('');
  const [deployedAddress, setDeployedAddress] = useState('');
  const [error, setError] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    if (address && !owner) setOwner(address);
    if (address && !treeFund) setTreeFund(address);
  }, [address, owner, treeFund]);

  const handleDeploy = async () => {
    setError('');
    setDeployedAddress('');

    if (!walletClient) {
      setError('Wallet not connected');
      return;
    }
    if (!isAddress(usdc) || usdc === zeroAddress) {
      setError('Enter a valid USDC token address');
      return;
    }
    if (!isAddress(treeFund) || treeFund === zeroAddress) {
      setError('Enter a valid tree fund recipient address');
      return;
    }
    if (!isAddress(owner) || owner === zeroAddress) {
      setError('Enter a valid contract owner address');
      return;
    }

    setIsDeploying(true);
    try {
      const contractAddress = await deployContract(walletClient, {
        abi: ECOMEMORY_DEPLOY_ABI,
        bytecode: ECOMEMORY_BYTECODE,
        args: [usdc, treeFund, owner],
      });
      setDeployedAddress(contractAddress);
    } catch (err: any) {
      setError(err?.message || 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-stone-900">Deploy EcoMemory</h1>
            <p className="mt-1 text-stone-600">Deploy the contract from your wallet on ARC Testnet.</p>
          </div>
          <ConnectButton />
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          {wrongNetwork && (
            <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              Please switch your wallet to ARC Testnet (chain ID {ARC_TESTNET.id}).
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700">USDC token address</label>
              <input
                value={usdc}
                onChange={(e) => setUsdc(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Tree fund recipient</label>
              <input
                value={treeFund}
                onChange={(e) => setTreeFund(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Contract owner</label>
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
                placeholder="0x..."
              />
            </div>

            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

            {deployedAddress && (
              <div className="rounded-lg bg-eco-50 p-4 text-sm text-eco-900">
                <p className="font-medium">Contract deployed successfully</p>
                <p className="mt-1 break-all font-mono">{deployedAddress}</p>
                <p className="mt-2 text-xs">
                  Save this address as NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS in your .env.local
                  and restart the frontend.
                </p>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={!isConnected || wrongNetwork || isDeploying}
              className="rounded-full bg-eco-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-eco-700 disabled:opacity-60"
            >
              {isDeploying ? 'Deploying...' : 'Deploy EcoMemory from wallet'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
