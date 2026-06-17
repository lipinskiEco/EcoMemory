'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Transaction {
  id: string;
  hash: `0x${string}`;
  description: string;
  status: 'pending' | 'success' | 'error';
  explorerUrl?: string;
  type?: 'tx' | 'address';
}

interface TransactionContextValue {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'status'>) => Transaction;
  updateTransaction: (hash: `0x${string}`, status: Transaction['status']) => void;
  removeTransaction: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextValue | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'status'>) => {
    const id = `${tx.hash}-${Date.now()}`;
    const item = { ...tx, id, status: 'pending' as const };
    setTransactions((prev) => [...prev, item]);
    return item;
  }, []);

  const updateTransaction = useCallback((hash: `0x${string}`, status: Transaction['status']) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.hash === hash ? { ...tx, status } : tx))
    );
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
}
