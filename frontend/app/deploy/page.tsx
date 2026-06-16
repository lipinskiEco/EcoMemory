'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWalletClient, useChainId, useSwitchChain } from 'wagmi';
import { isAddress, zeroAddress } from 'viem';
import { deployContract } from 'viem/actions';
import { ECOMEMORY_DEPLOY_ABI, ECOMEMORY_BYTECODE } from '@/lib/contractDeploy';
import { ConnectButton } from '@/components/ConnectButton';
import { ARC_TESTNET, USDC_ADDRESS } from '@/lib/contract';

export default function DeployPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const { switchChain } = useSwitchChain();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const [usdc, setUsdc] = useState<string>(USDC_ADDRESS || '');
  const [treeFund, setTreeFund] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [deployedAddress, setDeployedAddress] = useState('');
  const [error, setError] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (address && !owner) setOwner(address);
    if (address && !treeFund) setTreeFund(address);
  }, [address, owner, treeFund]);

  const copyAddress = () => {
    if (!deployedAddress) return;
    navigator.clipboard.writeText(deployedAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDeploy = async () => {
    setError('');
    setDeployedAddress('');
    setCopied(false);

    if (!walletClient) {
      setError('Wallet not connected');
      return;
    }
    if (wrongNetwork) {
      setError(`Switch your wallet to ARC Testnet (chain ID ${ARC_TESTNET.id})`);
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
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <p>Please switch your wallet to ARC Testnet (chain ID {ARC_TESTNET.id}).</p>
              <button
                onClick={() => switchChain?.({ chainId: ARC_TESTNET.id })}
                className="mt-3 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
              >
                Switch to ARC Testnet
              </button>
            </div>
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
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-stone-700">Tree fund recipient</label>
                {address && (
                  <button
                    onClick={() => setTreeFund(address)}
                    className="text-xs text-eco-600 hover:text-eco-800"
                  >
                    Use my address
                  </button>
                )}
              </div>
              <input
                value={treeFund}
                onChange={(e) => setTreeFund(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
                placeholder="0x..."
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-stone-700">Contract owner</label>
                {address && (
                  <button
                    onClick={() => setOwner(address)}
                    className="text-xs text-eco-600 hover:text-eco-800"
                  >
                    Use my address
                  </button>
                )}
              </div>
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
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={copyAddress}
                    className="rounded-md bg-eco-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-eco-700"
                  >
                    {copied ? 'Copied' : 'Copy address'}
                  </button>
                  <span className="text-xs text-stone-600">
                    Save as NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS in .env.local
                  </span>
                </div>
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
