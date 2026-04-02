import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, ShoppingBag, Coffee, Zap, CreditCard, Plus, Check } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
  onSave: (data: Partial<Transaction>) => void;
}

const CATEGORIES = [
  { name: 'Food and dining', icon: Coffee, color: 'bg-pink-500' },
  { name: 'Shopping', icon: ShoppingBag, color: 'bg-orange-500' },
  { name: 'Subscriptions', icon: CreditCard, color: 'bg-blue-500' },
  { name: 'Utilities', icon: Zap, color: 'bg-yellow-500' },
  { name: 'Income', icon: DollarSign, color: 'bg-green-500' },
  { name: 'Salary', icon: Plus, color: 'bg-emerald-500' },
];

export function TransactionForm({ transaction, onClose, onSave }: TransactionFormProps) {
  const [formData, setFormData] = useState<Partial<Transaction>>({
    merchant: '',
    amount: 0,
    category: 'Shopping',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        ...transaction,
        date: new Date(transaction.date).toISOString().split('T')[0],
      });
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: Number(formData.amount),
      date: new Date(formData.date!).toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-surface w-full max-w-lg rounded-[32px] border border-border-subtle shadow-2xl overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-text-main tracking-tight">
                {transaction ? 'Edit Transaction' : 'New Transaction'}
              </h2>
              <p className="text-sm text-text-muted mt-1">Fill in the details below</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-bg rounded-2xl text-text-muted hover:text-text-main transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-1 bg-bg rounded-2xl border border-border-subtle">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={cn(
                  "py-2.5 rounded-xl text-sm font-bold transition-all",
                  formData.type === 'expense' 
                    ? "bg-surface text-text-main shadow-sm border border-border-subtle" 
                    : "text-text-muted hover:text-text-main"
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={cn(
                  "py-2.5 rounded-xl text-sm font-bold transition-all",
                  formData.type === 'income' 
                    ? "bg-surface text-green-500 shadow-sm border border-border-subtle" 
                    : "text-text-muted hover:text-text-main"
                )}
              >
                Income
              </button>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-blue-500 transition-colors">
                  <ShoppingBag size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Merchant Name"
                  required
                  value={formData.merchant}
                  onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                  className="w-full bg-bg/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-blue-500 transition-colors">
                  <DollarSign size={18} />
                </div>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  required
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full bg-bg/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-xl font-black text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-blue-500 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-bg/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-blue-500 transition-colors">
                    <Tag size={18} />
                  </div>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-bg/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.name })}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all",
                    formData.category === cat.name 
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400" 
                      : "bg-bg border-border-subtle text-text-muted hover:border-text-muted"
                  )}
                >
                  <div className={cn("p-2 rounded-xl text-white shadow-sm", cat.color)}>
                    <cat.icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tight">{cat.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 bg-bg border border-border-subtle rounded-2xl text-sm font-bold text-text-main hover:bg-surface transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-blue-600 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <Check size={18} />
                {transaction ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
