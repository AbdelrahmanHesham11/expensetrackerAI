'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { generateAIAnswer } from '@/lib/ai';
import type { ExpenseRecord, IncomeRecord } from '@/types/finance';
export async function generateInsightAnswer(question: string): Promise<string> {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // look back 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 🔹 fetch expenses
    const expenses = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || 'Other',
      description: expense.text || '',
      date: expense.createdAt.toISOString(),
    }));

    // 🔹 fetch incomes
    const incomes = await db.income.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const incomeData: IncomeRecord[] = incomes.map((income) => ({
      id: income.id,
      amount: income.amount,
      source: income.description || 'Other',
      description: income.description || '',
      date: income.createdAt.toISOString(),
    }));

    // 🔹 hand both to AI
    const answer = await generateAIAnswer(question, {
      expenses: expenseData,
      incomes: incomeData,
    });

    return answer;
  } catch (error) {
    console.error('Error generating insight answer:', error);
    return "I'm unable to provide a detailed answer at the moment. Please try again.";
  }
}
