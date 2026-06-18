'use client';

import { useState } from 'react';
import { useAccount, useChainId, useWalletClient } from 'wagmi';
import { isAddress } from 'viem';
import { deployContract } from 'viem/actions';
import { useSwitchChain } from 'wagmi';
import { ECOMEMORY_DEPLOY_ABI, ECOMEMORY_BYTECODE } from '@/lib/contractDeploy';
import { ARC_TESTNET, USDC_ADDRESS } from '@/lib/contract';

export default function DeployPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const [paymentToken, setPaymentToken] = useState<string>(USDC_ADDRESS || '');
  const [treeFundRecipient, setTreeFundRecipient] = useState<string>(address || '');
  const [owner, setOwner] = useState<string>(address || '');
  const [deployedAddress, setDeployedAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState('');

  const handleCopy = () => {
    if (!deployedAddress) return;
    navigator.clipboard.writeText(deployedAddress).then(() => {
      alert('Contract address copied');
    });
  };

  const handleDeploy = async () => {
    setError('');
    setDeployedAddress('');

    if (!walletClient) {
      setError('Connect your wallet first');
      return;
    }
    if (wrongNetwork) {
      setError('Switch to ARC Testnet');
      return;
    }
    if (!isAddress(paymentToken)) {
      setError('Invalid USDC address');
      return;
    }
    if (!isAddress(treeFundRecipient)) {
      setError('Invalid tree fund recipient');
      return;
    }
    if (!isAddress(owner)) {
      setError('Invalid owner address');
      return;
    }

    setIsDeploying(true);
    try {
      const contractAddress = await deployContract(walletClient, {
        abi: ECOMEMORY_DEPLOY_ABI,
        bytecode: ECOMEMORY_BYTECODE,
        args: [paymentToken, treeFundRecipient, owner],
      });
      setDeployedAddress(contractAddress);
    } catch (err: any) {
      setError(err?.message || 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory px-6 py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest2 text-eco-700">Deployment</p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-wide text-ink">Deploy EcoMemory</h1>
          <p className="mt-3 font-serif text-ink/65">
            Deploy your own EcoMemory contract from your wallet on ARC Testnet.
          </p>
        </div>

        <div className="card">
          {!isConnected && (
            <div className="mb-6 rounded-2xl border border-ink/10 bg-cream/70 p-4 text-sm text-ink/65">
              Connect your wallet on ARC Testnet to deploy.
            </div>
          )}

          {wrongNetwork && (
            <button
              onClick={() => switchChain({ chainId: ARC_TESTNET.id })}
              disabled={isSwitching}
              className="mb-6 w-full rounded-2xl border border-red-300/60 bg-red-50 p-4 text-left text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
            >
              {isSwitching ? 'Switching...' : 'Switch to ARC Testnet (chain ID ' + ARC_TESTNET.id + ')'}
            </button>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest2 text-ink/55">USDC token address</label>
              <input
                value={paymentToken}
                onChange={(e) => setPaymentToken(e.target.value)}
                className="input mt-1.5"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest2 text-ink/55">Tree fund recipient</label>
              <input
                value={treeFundRecipient}
                onChange={(e) => setTreeFundRecipient(e.target.value)}
                className="input mt-1.5"
                placeholder="0x..."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest2 text-ink/55">Contract owner</label>
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="input mt-1.5"
                placeholder="0x..."
              />
            </div>

            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}

            {deployedAddress && (
              <div className="rounded-2xl border border-eco-300/60 bg-eco-100/60 p-4">
                <p className="font-medium text-ink">Contract deployed</p>
                <p className="mt-1 break-all font-mono text-sm text-ink/75">{deployedAddress}</p>
                <button
                  onClick={handleCopy}
                  className="mt-3 rounded-full border border-eco-700/40 bg-cream px-5 py-2 text-sm font-medium text-eco-800 transition hover:bg-eco-100/60"
                >
                  Copy address
                </button>
              </div>
            )}

            <button
              onClick={handleDeploy}
              disabled={!isConnected || wrongNetwork || isDeploying}
              className="btn-primary w-full"
            >
              {isDeploying ? 'Deploying...' : 'Deploy EcoMemory from wallet'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs uppercase tracking-widest2 text-ink/50 transition hover:text-ink">
            &larr; Back to EcoMemory
          </a>
        </div>
      </div>
    </main>
  );
}
