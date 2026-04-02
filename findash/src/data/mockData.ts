import { Transaction, MonthlyFlow, SpendingCategory } from '../types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2025-01-31T13:00:00Z',
    amount: 18.99,
    category: 'Subscriptions',
    type: 'expense',
    merchant: 'Spotify',
  },
  {
    id: '2',
    date: '2025-01-31T10:45:00Z',
    amount: 120.00,
    category: 'Income',
    type: 'income',
    merchant: 'Stripe',
  },
  {
    id: '3',
    date: '2025-01-31T03:20:00Z',
    amount: 4.50,
    category: 'Food and dining',
    type: 'expense',
    merchant: 'A Coffee',
  },
  {
    id: '4',
    date: '2025-01-31T02:45:00Z',
    amount: 88.00,
    category: 'Income',
    type: 'income',
    merchant: 'Stripe',
  },
  {
    id: '5',
    date: '2025-01-30T18:10:00Z',
    amount: 15.00,
    category: 'Subscriptions',
    type: 'expense',
    merchant: 'Figma',
  },
  {
    id: '6',
    date: '2025-01-29T12:00:00Z',
    amount: 45.00,
    category: 'Shopping',
    type: 'expense',
    merchant: 'Amazon',
  },
  {
    id: '7',
    date: '2025-01-28T09:30:00Z',
    amount: 2500.00,
    category: 'Salary',
    type: 'income',
    merchant: 'Tech Corp',
  },
  {
    id: '8',
    date: '2025-01-27T20:15:00Z',
    amount: 65.00,
    category: 'Utilities',
    type: 'expense',
    merchant: 'Electric Co',
  },
];

export const MOCK_MONTHLY_FLOW: MonthlyFlow[] = [
  { month: 'Jan', income: 45000, outcome: 32000 },
  { month: 'Feb', income: 42000, outcome: 28000 },
  { month: 'Mar', income: 48000, outcome: 35000 },
  { month: 'Apr', income: 40000, outcome: 30000 },
  { month: 'May', income: 52000, outcome: 38000 },
  { month: 'Jun', income: 46000, outcome: 31000 },
  { month: 'Jul', income: 49000, outcome: 34000 },
  { month: 'Aug', income: 51000, outcome: 36000 },
  { month: 'Sep', income: 47000, outcome: 33000 },
  { month: 'Oct', income: 53000, outcome: 39000 },
  { month: 'Nov', income: 50000, outcome: 35000 },
  { month: 'Dec', income: 55000, outcome: 41000 },
];

export const MOCK_SPENDING_CATEGORIES: SpendingCategory[] = [
  { name: 'Bills', amount: 34600, color: '#f97316' },
  { name: 'Subscriptions', amount: 18300, color: '#3b82f6' },
  { name: 'Food and dining', amount: 12000, color: '#d946ef' },
];
