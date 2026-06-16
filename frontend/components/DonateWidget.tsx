'use client';

import { useState, useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId,
} from 'wagmi';
import { erc20Abi, parseUnits, isAddress, zeroAddress } from 'viem';
import { ECOMEMORY_ABI, CONTRACT_ADDRESS, USDC_ADDRESS, ARC_TESTNET } from '@/lib/contract';
import { useTransactions } from '@/components/TransactionProvider';

interface DonateWidgetProps {
  tokenId: string;
  beneficiary: string;
}

export function DonateWidget({ tokenId, beneficiary }: DonateWidgetProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { addTransaction, updateTransaction } = useTransactions();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const [amount, setAmount] = useState('0.07');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const tokenIdBigInt = BigInt(tokenId);
  const amountBigInt = parseUnits(amount, 6);

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
    data: donateHash,
    writeContract: donate,
    isPending: isDonating,
    error: donateError,
  } = useWriteContract();

  const donateReceipt = useWaitForTransactionReceipt({ hash: donateHash });

  useEffect(() => {
    if (approveError) setError(approveError.message);
  }, [approveError]);

  useEffect(() => {
    if (donateError) setError(donateError.message);
  }, [donateError]);

  useEffect(() => {
    if (approveHash) addTransaction({ hash: approveHash, description: 'Approve USDC for donation' });
  }, [approveHash, addTransaction]);

  useEffect(() => {
    if (donateHash) {
      addTransaction({ hash: donateHash, description: 'Donate to EcoMemory memorial' });
      setSuccess(false);
    }
  }, [donateHash, addTransaction]);

  useEffect(() => {
    if (approveReceipt.isSuccess) updateTransaction(approveHash!, 'success');
    if (approveReceipt.isError) updateTransaction(approveHash!, 'error');
  }, [approveReceipt.isSuccess, approveReceipt.isError, approveHash, updateTransaction]);

  useEffect(() => {
    if (donateReceipt.isSuccess) {
      updateTransaction(donateHash!, 'success');
      setSuccess(true);
    }
    if (donateReceipt.isError) updateTransaction(donateHash!, 'error');
  }, [donateReceipt.isSuccess, donateReceipt.isError, donateHash, updateTransaction]);

  const handleApprove = () => {
    setError('');
    approve({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, amountBigInt],
    });
  };

  const handleDonate = () => {
    setError('');
    setSuccess(false);
    const parsed = parseFloat(amount);
    if (parsed < 0.05 || parsed > 0.1) {
      setError('Donation must be between $0.05 and $0.10');
      return;
    }
    if (!isAddress(beneficiary)) {
      setError('Invalid beneficiary address');
      return;
    }
    donate({
      address: CONTRACT_ADDRESS,
      abi: ECOMEMORY_ABI,
      functionName: 'donate',
      args: [tokenIdBigInt, amountBigInt],
    });
  };

  const needsApproval = !allowance || allowance < amountBigInt;

  return (
    <div className="card mx-auto mt-8 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-stone-900">Leave a donation</h2>
        <p className="text-sm text-stone-500">Support this memorial and plant trees.</p>
      </div>

      {!isConnected && (
        <p className="rounded-xl bg-stone-100 p-4 text-sm text-stone-600">
          Connect your wallet to send a micro-donation.
        </p>
      )}

      {wrongNetwork && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          Please switch your wallet to ARC Testnet (chain ID {ARC_TESTNET.id}).
        </p>
      )}

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">Amount (USDC)</label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="number"
              min="0.05"
              max="0.10"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
            />
            <span className="text-sm font-medium text-stone-500">USDC</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">50% goes to the memorial fund, 50% plants trees.</p>
        </div>

        {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && (
          <p className="rounded-xl bg-eco-50 p-3 text-sm text-eco-800">
            Thank you. Your donation was submitted on-chain.
          </p>
        )}

        <div className="flex items-center gap-3">
          {needsApproval && isConnected && !wrongNetwork ? (
            <button onClick={handleApprove} disabled={isApproving} className="btn-secondary">
              {isApproving ? 'Approving...' : 'Approve USDC'}
            </button>
          ) : (
            <button onClick={handleDonate} disabled={!isConnected || wrongNetwork || isDonating} className="btn-primary">
              {isDonating ? 'Sending...' : `Donate $${amount}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
