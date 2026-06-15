'use client';

import { useMemo } from 'react';
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
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg">
      <div className="bg-eco-800 px-8 py-12 text-center text-white">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{memorial.name}</h1>
        <p className="mt-3 text-eco-100">
          {memorial.birthDate || '...'} — {memorial.deathDate || '...'}
          {years !== null && <span className="ml-2">({years} years)</span>}
        </p>
      </div>

      <div className="grid gap-8 px-8 py-10 md:grid-cols-[1fr_auto]">
        <div className="space-y-6">
          <div className="rounded-2xl bg-stone-50 p-6">
            <p className="text-lg italic leading-relaxed text-stone-700">“{memorial.message}”</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-100 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-stone-500">Donations</p>
              <p className="mt-1 text-xl font-semibold text-eco-700">${formattedDonations}</p>
            </div>
            <div className="rounded-xl border border-stone-100 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-stone-500">Created</p>
              <p className="mt-1 text-sm font-medium text-stone-700">
                {new Date(Number(memorial.createdAt) * 1000).toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-xl border border-stone-100 p-4 text-center">
              <p className="text-xs uppercase tracking-wide text-stone-500">Token</p>
              <p className="mt-1 text-sm font-medium text-stone-700">#{tokenId}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <QRCode value={pageUrl} size={180} />
          <p className="max-w-[180px] text-center text-xs text-stone-500">
            Scan to visit this memorial page.
          </p>
        </div>
      </div>
    </div>
  );
}
