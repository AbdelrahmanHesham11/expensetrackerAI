'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

interface BalanceData {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyBalance: number;
}

async function getBalance(): Promise<{
  balance?: BalanceData;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // Get current month dates
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    // Get all income records
    const totalIncomeResult = await db.income.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    // Get all expense records
    const totalExpensesResult = await db.record.aggregate({
      where: { userId },
      _sum: { amount: true },
    });

    // Get monthly income
    const monthlyIncomeResult = await db.income.aggregate({
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: { amount: true },
    });

    // Get monthly expenses
    const monthlyExpensesResult = await db.record.aggregate({
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: { amount: true },
    });

    const totalIncome = totalIncomeResult._sum.amount || 0;
    const totalExpenses = totalExpensesResult._sum.amount || 0;
    const monthlyIncome = monthlyIncomeResult._sum.amount || 0;
    const monthlyExpenses = monthlyExpensesResult._sum.amount || 0;

    const balance: BalanceData = {
      totalIncome,
      totalExpenses,
      currentBalance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance: monthlyIncome - monthlyExpenses,
    };

    return { balance };
  } catch (error) {
    console.error('Error fetching balance:', error);
    return { error: 'Database error' };
  }
}

export default getBalance;