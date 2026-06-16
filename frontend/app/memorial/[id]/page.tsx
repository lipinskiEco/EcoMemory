'use client';

import { useParams } from 'next/navigation';
import { useReadContract } from 'wagmi';
import { ECOMEMORY_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
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
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-stone-500">Loading on-chain memorial...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-stone-900">Memorial not found</h1>
          <p className="mt-2 text-stone-600">
            This memorial does not exist on the contract yet.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-full bg-eco-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-eco-700"
          >
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
    <main className="min-h-screen bg-stone-50 py-12 px-6">
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
