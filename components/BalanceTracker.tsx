'use client';
import React, { useEffect, useState } from 'react';
import getBalance from '@/app/actions/getBalance';

interface BalanceData {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
}

const BalanceTracker: React.FC = () => {
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    const { balance: fetchedBalance, error } = await getBalance();

    if (error || !fetchedBalance) {
      setBalance(null);
      setLoading(false);
      return;
    }

    setBalance({
      totalIncome: fetchedBalance.totalIncome,
      totalExpenses: fetchedBalance.totalExpenses,
      currentBalance: fetchedBalance.currentBalance,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchBalance();

    // Poll every 5 seconds for real-time update
    const interval = setInterval(() => {
      fetchBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-6"></div>
        <div className="h-48 w-48 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mx-auto"></div>
      </div>
    );
  }

  if (!balance) {
    return <div className="text-red-500 dark:text-red-400">Unable to load balance data.</div>;
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  // Circle parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = balance.totalIncome > 0 ? balance.currentBalance / balance.totalIncome : 0;
  const offset = circumference - Math.max(0, Math.min(1, progress)) * circumference;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-center transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Balance Tracker</h2>

      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#E5E7EB"
            className="dark:stroke-gray-700"
            strokeWidth="15"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#10B981"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Balance</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(balance.currentBalance)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 border-l-4 border-green-400 dark:border-green-600">
          <span className="font-medium text-green-800 dark:text-green-200">Total Income</span>
          <div className="text-lg font-bold text-green-900 dark:text-green-300">{formatCurrency(balance.totalIncome)}</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 border-l-4 border-red-400 dark:border-red-600">
          <span className="font-medium text-red-800 dark:text-red-200">Total Expenses</span>
          <div className="text-lg font-bold text-red-900 dark:text-red-300">{formatCurrency(balance.totalExpenses)}</div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTracker;
