import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Zap, ShoppingBag, Calendar, Target, ArrowUpRight } from 'lucide-react';
import { Transaction } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface InsightsProps {
  transactions: Transaction[];
}

export function Insights({ transactions }: InsightsProps) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');
  
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  
  // Calculate highest spending category
  const categoryMap = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  // Calculate top merchant
  const merchantMap = expenses.reduce((acc, t) => {
    acc[t.merchant] = (acc[t.merchant] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const topMerchant = Object.entries(merchantMap).sort((a, b) => b[1] - a[1])[0];

  const insights = [
    {
      title: 'Highest Spending',
      value: highestCategory ? highestCategory[0] : 'N/A',
      detail: highestCategory ? `$${highestCategory[1].toLocaleString()} spent this month` : 'No data',
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      title: 'Top Merchant',
      value: topMerchant ? topMerchant[0] : 'N/A',
      detail: topMerchant ? `Total of $${topMerchant[1].toLocaleString()} spent` : 'No data',
      icon: ShoppingBag,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      detail: savingsRate > 20 ? 'Excellent savings discipline!' : 'Try to reach 20% savings rate',
      icon: Target,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Monthly Comparison',
      value: '+12.5%',
      detail: 'Spending increased compared to last month',
      icon: TrendingUp,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    {
      title: 'Weekly Average',
      value: `$${(totalExpenses / 4).toFixed(2)}`,
      detail: 'Average weekly outflow this month',
      icon: Calendar,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Savings Potential',
      value: '$450.00',
      detail: 'Possible savings by reducing subscriptions',
      icon: Zap,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health Score */}
        <div className="lg:col-span-2 bg-surface rounded-[32px] p-8 border border-border-subtle shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
          
          <div className="relative shrink-0">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-bg"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * 78) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-blue-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-text-main tracking-tighter">78</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Health Score</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-black text-text-main tracking-tight">Your financial health is Good!</h3>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">
                You're saving <span className="font-bold text-green-500">{savingsRate.toFixed(1)}%</span> of your income this month. 
                That's <span className="font-bold text-text-main">5% better</span> than your average.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-2 bg-green-500/10 rounded-xl text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                <TrendingUp size={14} /> High Savings
              </div>
              <div className="px-4 py-2 bg-blue-500/10 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Zap size={14} /> Low Subscriptions
              </div>
            </div>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="bg-surface rounded-[32px] p-8 border border-border-subtle shadow-sm flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl">
              <Target size={24} />
            </div>
            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Goal: New Car</span>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="text-3xl font-black text-text-main tracking-tighter">$12,450</h4>
              <span className="text-sm font-bold text-text-muted">of $25,000</span>
            </div>
            <div className="w-full h-3 bg-bg rounded-full overflow-hidden border border-border-subtle">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '49.8%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              />
            </div>
            <p className="text-xs text-text-muted mt-4 font-medium">
              You're <span className="text-text-main font-bold">49.8%</span> of the way there. Keep it up!
            </p>
          </div>
          <button className="mt-8 w-full py-3 bg-bg border border-border-subtle rounded-2xl text-sm font-bold text-text-main hover:bg-surface transition-all active:scale-95">
            Adjust Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <div key={insight.title} className="bg-surface rounded-3xl p-6 border border-border-subtle flex items-start gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
            <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300", insight.bg, insight.color)}>
              <insight.icon size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-muted">{insight.title}</p>
              <h4 className="text-xl font-bold text-text-main mt-1">{insight.value}</h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">{insight.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
