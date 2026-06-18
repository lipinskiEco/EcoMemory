'use client';

import { useState, useEffect } from 'react';
import {
  useAccount,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from 'wagmi';
import { erc20Abi, parseUnits, isAddress, zeroAddress } from 'viem';
import { TreeDeciduous, Wallet } from 'lucide-react';
import { ECOMEMORY_ABI, CONTRACT_ADDRESS, CONTRACT_ADDRESS_CONFIGURED, USDC_ADDRESS, ARC_TESTNET } from '@/lib/contract';
import { useTransactions } from '@/components/TransactionProvider';

interface DonateWidgetProps {
  tokenId: string;
  beneficiary: string;
}

export function DonateWidget({ tokenId, beneficiary }: DonateWidgetProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { addTransaction, updateTransaction } = useTransactions();
  const wrongNetwork = isConnected && chainId !== ARC_TESTNET.id;

  const [amount, setAmount] = useState('0.07');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const tokenIdBigInt = BigInt(tokenId);
  const amountBigInt = parseUnits(amount, 6);

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
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
    if (approveReceipt.isSuccess) {
      updateTransaction(approveHash!, 'success');
      refetchAllowance();
    }
    if (approveReceipt.isError) updateTransaction(approveHash!, 'error');
  }, [approveReceipt.isSuccess, approveReceipt.isError, approveHash, updateTransaction, refetchAllowance]);

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
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-eco-700/25 bg-eco-100/60 text-eco-700">
          <TreeDeciduous size={20} strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-medium tracking-wide text-ink">Leave a donation</h2>
          <p className="text-sm text-ink/55">Support this memorial and plant trees.</p>
        </div>
      </div>

      {!CONTRACT_ADDRESS_CONFIGURED && (
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Contract address not configured</p>
          <p className="mt-1">
            Set
            <code className="mx-1 rounded bg-amber-100 px-1 font-mono text-xs">NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS</code>
            in your environment to enable donations.
          </p>
        </div>
      )}

      {!isConnected && (
        <div className="rounded-2xl border border-ink/10 bg-cream/70 p-4 text-sm text-ink/65">
          <div className="flex items-center gap-3">
            <Wallet size={20} strokeWidth={1.75} className="text-ink/40" />
            <p>Connect your wallet to send a micro-donation.</p>
          </div>
        </div>
      )}

      {wrongNetwork && (
        <button
          onClick={() => switchChain({ chainId: ARC_TESTNET.id })}
          disabled={isSwitching}
          className="w-full rounded-2xl border border-red-300/60 bg-red-50 p-4 text-left text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
        >
          {isSwitching ? 'Switching…' : `Switch wallet to ARC Testnet (chain ID ${ARC_TESTNET.id})`}
        </button>
      )}

      <div className="mt-4 space-y-4">
        <div className="rounded-2xl border border-eco-300/50 bg-eco-100/50 p-4 text-sm text-ink/75">
          <div className="flex items-center justify-between">
            <span>50% to memorial</span>
            <span className="font-medium text-eco-800">${(parseFloat(amount || '0') / 2).toFixed(2)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span>50% to tree fund</span>
            <span className="font-medium text-eco-800">${(parseFloat(amount || '0') / 2).toFixed(2)}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest2 text-ink/55">Amount (USDC)</label>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              type="number"
              min="0.05"
              max="0.10"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
            />
            <span className="text-sm font-medium text-ink/50">USDC</span>
          </div>
          <p className="mt-1 text-xs text-ink/45">Choose between $0.05 and $0.10.</p>
        </div>

        {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && (
          <p className="rounded-2xl border border-eco-300/60 bg-eco-100/60 p-3 text-sm text-eco-800">
            Thank you. Your donation was submitted on-chain and will support this memorial and tree planting.
          </p>
        )}

        <div className="flex items-center gap-3">
          {needsApproval && isConnected && !wrongNetwork ? (
            <button onClick={handleApprove} disabled={isApproving} className="btn-secondary w-full">
              {isApproving ? 'Approving...' : 'Approve USDC'}
            </button>
          ) : (
            <button onClick={handleDonate} disabled={!isConnected || wrongNetwork || isDonating} className="btn-primary w-full">
              {isDonating ? 'Sending...' : `Donate $${amount}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
