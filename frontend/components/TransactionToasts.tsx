'use client';

import { useTransactions } from './TransactionProvider';
import { ARC_TESTNET } from '@/lib/contract';

export function TransactionToasts() {
  const { transactions, removeTransaction } = useTransactions();

  if (transactions.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {transactions.map((tx) => {
        const explorerUrl = tx.explorerUrl || `${ARC_TESTNET.blockExplorers.default.url}/tx/${tx.hash}`;
        const statusColor =
          tx.status === 'success' ? 'border-eco-500 bg-eco-50' : tx.status === 'error' ? 'border-red-400 bg-red-50' : 'border-stone-300 bg-white';
        const statusIcon = tx.status === 'success' ? '✓' : tx.status === 'error' ? '✕' : '●';

        return (
          <div
            key={tx.id}
            className={`flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg transition-all ${statusColor}`}
          >
            <span className="mt-0.5 text-sm font-semibold">{statusIcon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900">{tx.description}</p>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-xs font-mono text-stone-600 hover:text-eco-700 hover:underline"
              >
                {tx.hash}
              </a>
            </div>
            <button
              onClick={() => removeTransaction(tx.id)}
              className="text-sm text-stone-400 hover:text-stone-700"
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
