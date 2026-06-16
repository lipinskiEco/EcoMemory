'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';
import { ReactNode, useState } from 'react';
import { TransactionProvider } from '@/components/TransactionProvider';
import { TransactionToasts } from '@/components/TransactionToasts';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          {children}
          <TransactionToasts />
        </TransactionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
