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
import { useTransactions } from '@/components/TransactionProvider';

export function MintForm() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { addTransaction, updateTransaction } = useTransactions();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [message, setMessage] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    data: approveHash,
    writeContract: approve,
    isPending: isApproving,
    error: approveError,
  } = useWriteContract();

  const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash });

  const {
    data: mintHash,
    writeContract: mint,
    isPending: isMinting,
    error: mintError,
  } = useWriteContract();

  const mintReceipt = useWaitForTransactionReceipt({ hash: mintHash });

  useEffect(() => {
    if (approveError) setError(approveError.message);
  }, [approveError]);

  useEffect(() => {
    if (mintError) setError(mintError.message);
  }, [mintError]);

  useEffect(() => {
    if (approveHash) {
      addTransaction({
        hash: approveHash,
        description: 'Approve USDC for EcoMemory',
      });
    }
  }, [approveHash, addTransaction]);

  useEffect(() => {
    if (mintHash) {
      addTransaction({
        hash: mintHash,
        description: 'Mint EcoMemory memorial NFT',
      });
      setSuccess(false);
    }
  }, [mintHash, addTransaction]);

  useEffect(() => {
    if (approveReceipt.isSuccess) {
      updateTransaction(approveHash!, 'success');
    }
    if (approveReceipt.isError) {
      updateTransaction(approveHash!, 'error');
    }
  }, [approveReceipt.isSuccess, approveReceipt.isError, approveHash, updateTransaction]);

  useEffect(() => {
    if (mintReceipt.isSuccess) {
      updateTransaction(mintHash!, 'success');
      setSuccess(true);
    }
    if (mintReceipt.isError) {
      updateTransaction(mintHash!, 'error');
    }
  }, [mintReceipt.isSuccess, mintReceipt.isError, mintHash, updateTransaction]);

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
    setSuccess(false);
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

  const needsApproval = !allowance || (mintPrice && allowance < mintPrice);

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-stone-900">Mint a memorial</h2>
        <p className="text-sm text-stone-500">Cost: {mintPrice ? '0.10 USDC' : 'loading...'}</p>
      </div>

      {!isConnected && (
        <p className="rounded-xl bg-stone-100 p-4 text-sm text-stone-600">
          Connect your wallet on ARC Testnet to continue.
        </p>
      )}

      {wrongNetwork && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          Please switch your wallet to ARC Testnet (chain ID {ARC_TESTNET.id}).
        </p>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Jane Doe"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700">Birth date</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Death date</label>
            <input type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)} className="input" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={512}
            rows={4}
            className="input"
            placeholder="A short message..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Beneficiary address</label>
          <input
            value={beneficiary}
            onChange={(e) => setBeneficiary(e.target.value)}
            className="input"
            placeholder="0x..."
          />
          <p className="mt-1 text-xs text-stone-500">Donations to this memorial will be sent to this address.</p>
        </div>

        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && (
          <p className="rounded-xl bg-eco-50 p-3 text-sm text-eco-800">
            Memorial minted successfully. Check the transaction toast in the corner.
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          {needsApproval && isConnected && !wrongNetwork ? (
            <button onClick={handleApprove} disabled={isApproving} className="btn-secondary">
              {isApproving ? 'Approving USDC...' : 'Approve USDC'}
            </button>
          ) : (
            <button onClick={handleMint} disabled={!isConnected || wrongNetwork || isMinting} className="btn-primary">
              {isMinting ? 'Minting...' : 'Mint memorial — 0.10 USDC'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
