'use server';
import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { generateGoalSuggestions, FinanceGoal } from '@/lib/ai';

export async function getAIGoals(): Promise<FinanceGoal[]> {
  try {
    const user = await checkUser();
    if (!user) throw new Error('User not authenticated');

    // Fetch current goals, income, and expenses
    const goals = await db.financeGoal.findMany({
      where: { userId: user.clerkUserId },
    });

    const totalIncome = await db.income.aggregate({
      _sum: { amount: true },
      where: { userId: user.clerkUserId }
    });

    const monthlyExpenses = await db.record.aggregate({
      _sum: { amount: true },
      where: { userId: user.clerkUserId }
    });

    // Call your AI function
    const aiGoals = await generateGoalSuggestions(
      goals,
      totalIncome._sum.amount || 0,
      monthlyExpenses._sum.amount || 0
    );

    return aiGoals;
  } catch (error) {
    console.error('Error getting AI goals:', error);
    return [];
  }
}
