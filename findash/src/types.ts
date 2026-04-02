export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  merchant: string;
  icon?: string;
}

export type UserRole = 'admin' | 'viewer';

export interface DashboardStats {
  totalBalance: number;
  income: number;
  expenses: number;
  savingsRate: number;
}

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export interface MonthlyFlow {
  month: string;
  income: number;
  outcome: number;
}
