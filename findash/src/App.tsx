/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from './components/Layout';
import { Section } from './components/Sidebar';
import { MoneyFlowChart, ExpensesBreakdownChart } from './components/Charts';
import { TransactionTable } from './components/TransactionTable';
import { MyCards } from './components/MyCards';
import { TransactionForm } from './components/TransactionForm';
import { Insights } from './components/Insights';
import { Transaction, UserRole } from './types';
import { MOCK_MONTHLY_FLOW, MOCK_SPENDING_CATEGORIES } from './data/mockData';
import { TrendingUp, TrendingDown, Wallet, Clock, ArrowRight } from 'lucide-react';
import { useTransactions } from './hooks/useTransactions';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const [role, setRole] = useState<UserRole>('admin');
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const { addToast } = useToast();

  const handleAddTransaction = () => {
    setEditingTransaction(undefined);
    setIsFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    addToast('Transaction deleted successfully', 'success');
  };

  const handleSaveTransaction = (data: Partial<Transaction>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      addToast('Transaction updated successfully', 'success');
    } else {
      addTransaction(data);
      addToast('Transaction added successfully', 'success');
    }
    setIsFormOpen(false);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-surface rounded-3xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-muted">Total Balance</p>
                    <h4 className="text-xl md:text-2xl font-bold text-text-main">$86,320.25</h4>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-3xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 text-green-600 dark:text-green-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-muted">Income</p>
                    <h4 className="text-xl md:text-2xl font-bold text-text-main">$4,250.00</h4>
                  </div>
                </div>
              </div>
              <div className="bg-surface rounded-3xl p-6 border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-2xl group-hover:scale-110 transition-transform">
                    <TrendingDown size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-muted">Expenses</p>
                    <h4 className="text-xl md:text-2xl font-bold text-text-main">$2,180.50</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <MoneyFlowChart data={MOCK_MONTHLY_FLOW} />
                
                {/* Recent Activity Section */}
                <div className="bg-surface rounded-3xl p-6 border border-border-subtle shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-blue-500" />
                      <h3 className="text-lg font-semibold text-text-main">Recent Activity</h3>
                    </div>
                    <button 
                      onClick={() => setActiveSection('transactions')}
                      className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      View All <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {transactions.slice(0, 4).map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-bg/50 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface border border-border-subtle flex items-center justify-center font-bold text-text-main group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                            {t.merchant[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-main">{t.merchant}</p>
                            <p className="text-xs text-text-muted">{t.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${t.type === 'income' ? 'text-green-500' : 'text-text-main'}`}>
                            {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                          </p>
                          <p className="text-[10px] text-text-muted">{new Date(t.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                <MyCards />
                <ExpensesBreakdownChart categories={MOCK_SPENDING_CATEGORIES} />
              </div>
            </div>
          </motion.div>
        );
      case 'transactions':
        return (
          <motion.div 
            key="transactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <TransactionTable 
              transactions={transactions} 
              role={role}
              onAdd={handleAddTransaction}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </motion.div>
        );
      case 'insights':
        return (
          <motion.div 
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Insights transactions={transactions} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      role={role}
      onRoleChange={setRole}
    >
      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TransactionForm 
              transaction={editingTransaction}
              onClose={() => setIsFormOpen(false)}
              onSave={handleSaveTransaction}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
