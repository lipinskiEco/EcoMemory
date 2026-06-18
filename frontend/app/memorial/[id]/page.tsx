'use client';

import { useParams } from 'next/navigation';
import { useReadContract } from 'wagmi';
import { Leaf } from 'lucide-react';
import { ECOMEMORY_ABI, CONTRACT_ADDRESS, CONTRACT_ADDRESS_CONFIGURED } from '@/lib/contract';
import { MemorialCard, MemorialData } from '@/components/MemorialCard';
import { DonateWidget } from '@/components/DonateWidget';

export default function MemorialPage() {
  const params = useParams();
  const tokenId = Array.isArray(params.id) ? params.id[0] : params.id || '0';

  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ECOMEMORY_ABI,
    functionName: 'getMemorial',
    args: [BigInt(tokenId)],
    query: { enabled: !!CONTRACT_ADDRESS },
  });

  const pageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/memorial/${tokenId}`
      : '';

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-eco-200 border-t-eco-600" />
          <p className="text-stone-500">Loading on-chain memorial...</p>
        </div>
      </main>
    );
  }

  if (!CONTRACT_ADDRESS_CONFIGURED) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none border-2 border-amber-200 bg-amber-100 text-amber-700">
            <Leaf size={28} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold text-stone-900">Contract not configured</h1>
          <p className="mt-2 text-stone-600">
            Deploy the EcoMemory contract from your wallet, then set
            <code className="mx-1 rounded bg-stone-100 px-1 font-mono">NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS</code>
            in your environment and restart the frontend.
          </p>
          <a href="/" className="mt-6 inline-block btn-primary">
            Back to homepage
          </a>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none border-2 border-eco-200 bg-eco-100 text-eco-700">
            <Leaf size={28} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold text-stone-900">Memorial not found</h1>
          <p className="mt-2 text-stone-600">This memorial does not exist on the contract yet.</p>
          <a href="/" className="mt-6 inline-block btn-primary">
            Create a memorial
          </a>
        </div>
      </main>
    );
  }

  const memorial: MemorialData = {
    name: data[0],
    birthDate: data[1],
    deathDate: data[2],
    message: data[3],
    beneficiary: data[4],
    totalDonations: data[5],
    createdAt: data[6],
    owner: data[7],
  };

  return (
    <main className="min-h-screen bg-stone-50 py-12 px-6 leaf-pattern">
      <MemorialCard memorial={memorial} tokenId={tokenId} pageUrl={pageUrl} />
      <DonateWidget tokenId={tokenId} beneficiary={memorial.beneficiary} />

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <a href="/" className="text-sm text-stone-500 hover:text-stone-800">
          ← Back to EcoMemory
        </a>
      </div>
    </main>
  );
}
