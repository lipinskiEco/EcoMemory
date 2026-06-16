'use client';

import { useState, useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi';
import { erc20Abi, isAddress, zeroAddress } from 'viem';
import { ECOMEMORY_ABI, CONTRACT_ADDRESS, USDC_ADDRESS, ARC_TESTNET } from '@/lib/contract';
import { ConnectButton } from './ConnectButton';

export function MintForm() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [message, setMessage] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [step, setStep] = useState<'form' | 'approve' | 'mint' | 'done'>('form');
  const [error, setError] = useState<string>('');


  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const { data: mintPrice } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ECOMEMORY_ABI,
    functionName: 'MINT_PRICE',
    query: { enabled: !!CONTRACT_ADDRESS },
  });

  const { data: allowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address || zeroAddress, CONTRACT_ADDRESS],
    query: { enabled: isConnected && !!USDC_ADDRESS && !!CONTRACT_ADDRESS },
  });

  const {
    data: approveData,
    writeContract: approve,
    isPending: isApproving,
    error: approveError,
  } = useWriteContract();

  const approveReceipt = useWaitForTransactionReceipt({ hash: approveData });

  const {
    data: mintData,
    writeContract: mint,
    isPending: isMinting,
    error: mintError,
  } = useWriteContract();

  const mintReceipt = useWaitForTransactionReceipt({ hash: mintData });

  const handleApprove = () => {
    setError('');
    if (!mintPrice) return;
    approve({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, mintPrice],
    });
  };

  const handleMint = () => {
    setError('');
    if (!isAddress(beneficiary)) {
      setError('Please enter a valid beneficiary address');
      return;
    }
    if (!name || !message) {
      setError('Name and message are required');
      return;
    }

    mint({
      address: CONTRACT_ADDRESS,
      abi: ECOMEMORY_ABI,
      functionName: 'mint',
      args: [name, birthDate, deathDate, message, beneficiary],
    });
  };

  useEffect(() => {
    if (approveError) {
      setError(approveError.message);
    }
  }, [approveError]);

  useEffect(() => {
    if (mintError) {
      setError(mintError.message);
    }
  }, [mintError]);

  useEffect(() => {
    if (approveReceipt.isSuccess && step === 'approve') {
      setStep('mint');
    }
  }, [approveReceipt.isSuccess, step]);

  useEffect(() => {
    if (mintReceipt.isSuccess && step === 'mint') {
      setStep('done');
    }
  }, [mintReceipt.isSuccess, step]);

  const needsApproval = !allowance || (mintPrice && allowance < mintPrice);

  if (step === 'done') {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-eco-800">Memorial created</h2>
        <p className="mt-2 text-stone-600">
          Your transaction was submitted. You can view the memorial once it is indexed.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-full bg-eco-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-eco-700"
        >
          Back home
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Mint a memorial</h2>
          <p className="text-sm text-stone-500">Cost: {mintPrice ? '0.10 USDC' : 'loading...'}</p>
        </div>
        <ConnectButton />
      </div>

      {!isConnected && (
        <p className="rounded-lg bg-stone-100 p-4 text-sm text-stone-600">
          Connect your wallet on ARC Testnet to continue.
        </p>
      )}

      {wrongNetwork && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          Please switch your wallet to ARC Testnet (chain ID {ARC_TESTNET.id}).
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            placeholder="Jane Doe"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700">Birth date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Death date</label>
            <input
              type="date"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={512}
            rows={4}
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            placeholder="A short message..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Beneficiary address</label>
          <input
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none focus:ring-1 focus:ring-eco-500"
            placeholder="0x..."
          />
          <p className="mt-1 text-xs text-stone-500">
            Donations to this memorial will be sent to this address.
          </p>
        </div>

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          {needsApproval && isConnected && !wrongNetwork ? (
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="rounded-full bg-stone-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60"
            >
              {isApproving ? 'Approving USDC...' : 'Approve USDC'}
            </button>
          ) : (
            <button
              onClick={handleMint}
              disabled={!isConnected || wrongNetwork || isMinting}
              className="rounded-full bg-eco-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-eco-700 disabled:opacity-60"
            >
              {isMinting ? 'Minting...' : 'Mint memorial — 0.10 USDC'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
