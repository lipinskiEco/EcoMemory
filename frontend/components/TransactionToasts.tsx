'use client';

import { useTransactions } from './TransactionProvider';
import { ARC_TESTNET } from '@/lib/contract';

export function TransactionToasts() {
  const { transactions, removeTransaction } = useTransactions();

  if (transactions.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {transactions.map((tx) => {
        const base = ARC_TESTNET.blockExplorers.default.url;
        const explorerUrl = tx.explorerUrl || `${base}/${tx.type === 'address' ? 'address' : 'tx'}/${tx.hash}`;
        const statusColor =
          tx.status === 'success' ? 'border-eco-500/60 bg-eco-100/70' : tx.status === 'error' ? 'border-red-400 bg-red-50' : 'border-ink/15 bg-cream/90';
        const statusIcon = tx.status === 'success' ? '✓' : tx.status === 'error' ? '✕' : '●';

        return (
          <div
            key={tx.id}
            className={`flex w-80 items-start gap-3 rounded-2xl border p-4 shadow-soft backdrop-blur-sm transition-all ${statusColor}`}
          >
            <span className="mt-0.5 text-sm font-semibold">{statusIcon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">{tx.description}</p>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-xs font-mono text-ink/60 hover:text-eco-800 hover:underline"
              >
                {tx.hash}
              </a>
            </div>
            <button
              onClick={() => removeTransaction(tx.id)}
              className="text-sm text-ink/40 hover:text-ink/80"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
