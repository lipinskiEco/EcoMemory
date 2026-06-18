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
      <main className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-eco-200 border-t-eco-700" />
          <p className="font-serif italic text-ink/55">Loading on-chain memorial...</p>
        </div>
      </main>
    );
  }

  if (!CONTRACT_ADDRESS_CONFIGURED) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/60 bg-amber-100 text-amber-700">
            <Leaf size={26} strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-2xl font-medium tracking-wide text-ink">Contract not configured</h1>
          <p className="mt-3 font-serif text-ink/65">
            Deploy the EcoMemory contract from your wallet, then set
            <code className="mx-1 rounded bg-ink/5 px-1 font-mono text-xs">NEXT_PUBLIC_ECOMEMORY_CONTRACT_ADDRESS</code>
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
      <main className="flex min-h-screen items-center justify-center bg-ivory px-6">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-eco-700/25 bg-eco-100/60 text-eco-700">
            <Leaf size={26} strokeWidth={1.75} />
          </div>
          <h1 className="font-display text-2xl font-medium tracking-wide text-ink">Memorial not found</h1>
          <p className="mt-3 font-serif text-ink/65">This memorial does not exist on the contract yet.</p>
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
    <main className="min-h-screen bg-ivory py-14 px-6 leaf-pattern">
      <MemorialCard memorial={memorial} tokenId={tokenId} pageUrl={pageUrl} />
      <DonateWidget tokenId={tokenId} beneficiary={memorial.beneficiary} />

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <a href="/" className="text-xs uppercase tracking-widest2 text-ink/50 transition hover:text-ink">
          ← Back to EcoMemory
        </a>
      </div>
    </main>
  );
}
