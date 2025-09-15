'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { generateFinanceInsight, AIInsight, ExpenseRecord, IncomeRecord } from '@/lib/ai';

export async function getAIInsights(): Promise<AIInsight[]> {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Look back 30 days for analysis
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 🔹 Fetch expenses
    const expenses = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Increased for better analysis
    });

    // 🔹 Fetch incomes
    const incomes = await db.income.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    // Check if user has any data
    if (expenses.length === 0 && incomes.length === 0) {
      // Return default insights for new users
      return [
        {
          id: 'welcome-1',
          type: 'info',
          title: 'Welcome to FinSight AI!',
          message:
            'Start adding your expenses and income to get personalized AI insights about your financial health.',
          action: 'Add your first transaction',
          confidence: 1.0,
        },
        {
          id: 'welcome-2',
          type: 'tip',
          title: 'Track Both Income & Expenses',
          message:
            'For best insights, log both your income and expenses. This helps our AI analyze your savings rate and spending patterns.',
          action: 'Learn about tracking',
          confidence: 1.0,
        },
      ];
    }

    // Convert expenses to format expected by AI
    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || 'Other',
      description: expense.text || '',
      date: expense.createdAt.toISOString(),
    }));

    // Convert incomes to format expected by AI
    const incomeData: IncomeRecord[] = incomes.map((income) => ({
      id: income.id,
      amount: income.amount,
      description: income.description || '',
      date: income.createdAt.toISOString(),
    }));

    console.log(`📊 Generating insights: ${expenseData.length} expenses, ${incomeData.length} incomes`);

    // 🔹 Generate AI insights using both income and expenses
    const insights = await generateFinanceInsight(expenseData, incomeData);
    
    return insights;
  } catch (error) {
    console.error('❌ Error getting AI insights:', error);

    // Return fallback insights
    return [
      {
        id: 'error-1',
        type: 'warning',
        title: 'AI Insights Temporarily Unavailable',
        message:
          "We're having trouble analyzing your financial data right now. Please try again in a few minutes.",
        action: 'Retry analysis',
        confidence: 0.5,
      },
    ];
  }
}