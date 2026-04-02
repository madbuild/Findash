import { useState, useCallback } from 'react';
import { Transaction } from '../types';
import { MOCK_TRANSACTIONS } from '../data/mockData';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const addTransaction = useCallback((data: Partial<Transaction>) => {
    const newTransaction: Transaction = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      date: data.date || new Date().toISOString(),
    } as Transaction;
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id: string, data: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...data } as Transaction : t));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
