'use client';

import { useMemo } from 'react';
import { Leaf } from 'lucide-react';
import { QRCode } from './QRCode';

export interface MemorialData {
  name: string;
  birthDate: string;
  deathDate: string;
  message: string;
  beneficiary: string;
  totalDonations: bigint;
  createdAt: bigint;
  owner: string;
}

interface MemorialCardProps {
  memorial: MemorialData;
  tokenId: string;
  pageUrl: string;
}

export function MemorialCard({ memorial, tokenId, pageUrl }: MemorialCardProps) {
  const years = useMemo(() => {
    if (!memorial.birthDate || !memorial.deathDate) return null;
    const birth = new Date(memorial.birthDate).getFullYear();
    const death = new Date(memorial.deathDate).getFullYear();
    if (isNaN(birth) || isNaN(death)) return null;
    return death - birth;
  }, [memorial.birthDate, memorial.deathDate]);

  const formattedDonations = useMemo(() => {
    const total = Number(memorial.totalDonations) / 1_000_000;
    return total.toFixed(2);
  }, [memorial.totalDonations]);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-ink/10 bg-cream/80 shadow-soft backdrop-blur-sm">
      <div className="relative px-8 py-16 text-center text-ivory hero-bg leaf-pattern">
        <div className="absolute inset-0 grain opacity-[0.1]" aria-hidden />
        <div className="absolute left-5 top-5 text-xs uppercase tracking-widest2 text-ivory/70">
          EcoMemory #{tokenId}
        </div>
        <div className="relative mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-ivory/25 bg-ivory/10 text-ivory backdrop-blur-sm">
          <Leaf size={26} strokeWidth={1.75} />
        </div>
        <h1 className="relative font-display text-4xl font-medium uppercase tracking-wide sm:text-5xl">{memorial.name}</h1>
        <p className="relative mt-3 font-serif text-ivory/80">
          {memorial.birthDate || '...'} — {memorial.deathDate || '...'}
          {years !== null && <span className="ml-2 italic">({years} years)</span>}
        </p>
      </div>

      <div className="grid gap-8 px-8 py-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          <div className="rounded-2xl border-l-2 border-eco-500 bg-eco-100/40 p-6">
            <p className="font-serif text-lg italic leading-relaxed text-ink/80">“{memorial.message}”</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 p-4 text-center">
              <p className="text-xs uppercase tracking-widest2 text-ink/50">Donations</p>
              <p className="mt-1 font-display text-2xl font-medium text-eco-800">${formattedDonations}</p>
            </div>
            <div className="rounded-2xl border border-ink/10 p-4 text-center">
              <p className="text-xs uppercase tracking-widest2 text-ink/50">Created</p>
              <p className="mt-1 text-sm font-medium text-ink/75">
                {new Date(Number(memorial.createdAt) * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 p-4 text-center">
              <p className="text-xs uppercase tracking-widest2 text-ink/50">Token</p>
              <p className="mt-1 text-sm font-medium text-ink/75">#{tokenId}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
            <QRCode value={pageUrl} size={180} />
          </div>
          <p className="max-w-[180px] text-center text-xs text-ink/50">
            Scan to visit this memorial page.
          </p>
        </div>
      </div>
    </div>
  );
}
