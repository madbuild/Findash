import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Filter, Calendar, Search, Plus, Trash2, Edit2, ChevronDown, MoreVertical } from 'lucide-react';
import { Transaction, UserRole } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TransactionTableProps {
  transactions: Transaction[];
  role: UserRole;
  onDelete?: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
  onAdd?: () => void;
}

export function TransactionTable({ transactions, role, onDelete, onEdit, onAdd }: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [transactions, searchTerm, filterType, sortOrder]);

  return (
    <div className="space-y-4">
      <div className="bg-surface rounded-3xl p-4 md:p-6 border border-border-subtle shadow-sm transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-text-main">Transaction History</h3>
            <p className="text-sm text-text-muted mt-1">Monitor your financial activities</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-bg/50 border border-border-subtle rounded-xl py-2 pl-10 pr-4 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="flex-1 sm:flex-none bg-bg/50 border border-border-subtle rounded-xl py-2 px-3 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              
              {role === 'admin' && (
                <button 
                  onClick={onAdd}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  <Plus size={18} />
                  Add New
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-text-muted uppercase tracking-widest border-b border-border-subtle">
                <th className="pb-4 font-bold">Transaction</th>
                <th className="pb-4 font-bold">Category</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Amount</th>
                {role === 'admin' && <th className="pb-4 font-bold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((t) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={t.id} 
                    className="group hover:bg-bg/40 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm",
                          t.merchant === 'Spotify' ? "bg-green-500" : 
                          t.merchant === 'Stripe' ? "bg-blue-600" : 
                          t.merchant === 'Figma' ? "bg-purple-500" : "bg-gray-400"
                        )}>
                          {t.merchant[0]}
                        </div>
                        <span className="font-semibold text-text-main">{t.merchant}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-bg border border-border-subtle rounded-full text-xs font-medium text-text-muted">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-text-muted">
                      {format(new Date(t.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-4">
                      <span className={cn(
                        "font-bold text-base",
                        t.type === 'income' ? "text-green-500" : "text-text-main"
                      )}>
                        {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                      </span>
                    </td>
                    {role === 'admin' && (
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => onEdit?.(t)}
                            className="p-2 text-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => onDelete?.(t.id)}
                            className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredTransactions.map((t) => (
            <div key={t.id} className="bg-bg/50 border border-border-subtle rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white",
                    t.merchant === 'Spotify' ? "bg-green-500" : 
                    t.merchant === 'Stripe' ? "bg-blue-600" : 
                    t.merchant === 'Figma' ? "bg-purple-500" : "bg-gray-400"
                  )}>
                    {t.merchant[0]}
                  </div>
                  <div>
                    <p className="font-bold text-text-main">{t.merchant}</p>
                    <p className="text-xs text-text-muted">{format(new Date(t.date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-bold",
                    t.type === 'income' ? "text-green-500" : "text-text-main"
                  )}>
                    {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                  </p>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">{t.category}</span>
                </div>
              </div>
              
              {role === 'admin' && (
                <div className="flex gap-2 pt-2 border-t border-border-subtle">
                  <button 
                    onClick={() => onEdit?.(t)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-surface border border-border-subtle rounded-xl text-xs font-bold text-text-main"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => onDelete?.(t.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-500"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center mx-auto mb-4 border border-border-subtle">
              <Search size={24} className="text-text-muted opacity-20" />
            </div>
            <p className="text-text-muted font-medium">No transactions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
