import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { MonthlyFlow, SpendingCategory } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface MoneyFlowChartProps {
  data: MonthlyFlow[];
}

export function MoneyFlowChart({ data }: MoneyFlowChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="bg-surface rounded-3xl p-6 border border-border-subtle h-full min-h-[400px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-text-main">Money Flow</h3>
          <p className="text-xs text-text-muted mt-1">Monthly income vs outcome</p>
        </div>
        <div className="flex gap-6 text-xs font-bold">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40"></div>
            <span className="text-text-muted uppercase tracking-wider">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/40"></div>
            <span className="text-text-muted uppercase tracking-wider">Outcome</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="outcomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(15, 23, 42, 0.03)"} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? '#6b7280' : '#64748b', fontSize: 11, fontWeight: 600 }}
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? '#6b7280' : '#64748b', fontSize: 11, fontWeight: 600 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(15, 23, 42, 0.01)' }}
            contentStyle={{ 
              backgroundColor: isDark ? '#121418' : '#ffffff', 
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15, 23, 42, 0.1)'}`,
              borderRadius: '20px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              padding: '12px 16px'
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            labelStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', color: '#64748b' }}
          />
          <Bar dataKey="income" fill="url(#incomeGradient)" radius={[6, 6, 0, 0]} barSize={10} />
          <Bar dataKey="outcome" fill="url(#outcomeGradient)" radius={[6, 6, 0, 0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ExpensesBreakdownChartProps {
  categories: SpendingCategory[];
}

export function ExpensesBreakdownChart({ categories }: ExpensesBreakdownChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lineData = [
    { name: 'Jan 1', bills: 4000, subs: 2400, food: 2400 },
    { name: 'Jan 8', bills: 3000, subs: 1398, food: 2210 },
    { name: 'Jan 15', bills: 2000, subs: 9800, food: 2290 },
    { name: 'Jan 22', bills: 2780, subs: 3908, food: 2000 },
    { name: 'Jan 29', bills: 1890, subs: 4800, food: 2181 },
  ];

  return (
    <div className="bg-surface rounded-3xl p-6 border border-border-subtle h-full min-h-[400px] flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-text-main">Expenses Breakdown</h3>
        <button className="p-2 text-text-muted hover:text-text-main hover:bg-bg rounded-xl transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-6">Jan 1 - Jan 31, 2025</p>
      
      <div className="mb-8 p-4 bg-bg/50 rounded-2xl border border-border-subtle">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-text-main">$64,900</span>
          <span className="text-xs font-bold text-red-500">+12%</span>
        </div>
        <p className="text-[10px] text-text-muted mt-1 font-medium">Total spending this month</p>
      </div>

      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="colorBills" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#121418' : '#ffffff', 
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area type="monotone" dataKey="bills" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorBills)" />
            <Area type="monotone" dataKey="subs" stroke="#3b82f6" strokeWidth={3} fill="transparent" />
            <Area type="monotone" dataKey="food" stroke="#d946ef" strokeWidth={3} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: cat.color }}></div>
                <span className="text-sm font-semibold text-text-muted group-hover:text-text-main transition-colors">{cat.name}</span>
              </div>
              <span className="text-sm font-bold text-text-main">${cat.amount.toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 bg-bg rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(cat.amount / 64900) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full" 
                style={{ backgroundColor: cat.color }}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
