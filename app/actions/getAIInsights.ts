'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { 
  generateFinanceInsight, 
  generateGoalInsights,
  AIInsight, 
  ExpenseRecord, 
  IncomeRecord,
  GoalRecord 
} from '@/lib/ai';

export async function getAIInsights(): Promise<AIInsight[]> {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Look back 30 days for analysis
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

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
      take: 100, 
    });


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


    const goals = await db.goal.findMany({
      where: {
        userId: user.clerkUserId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

  
    if (expenses.length === 0 && incomes.length === 0) {

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


    const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      category: expense.category || 'Other',
      description: expense.text || '',
      date: expense.createdAt.toISOString(),
    }));

    
    const incomeData: IncomeRecord[] = incomes.map((income) => ({
      id: income.id,
      amount: income.amount,
      description: income.description || '',
      date: income.createdAt.toISOString(),
    }));

      const goalData: GoalRecord[] = goals.map((goal) => ({
            id: goal.id,
            title: goal.title,
            target: goal.target,
            progress: goal.progress || 0,
            deadline: goal.deadline?.toISOString() ?? undefined,
          }));

    console.log(`📊 Generating insights: ${expenseData.length} expenses, ${incomeData.length} incomes, ${goalData.length} goals`);

    const allInsights: AIInsight[] = [];


    const financeInsights = await generateFinanceInsight(expenseData, incomeData);
    allInsights.push(...financeInsights);

    if (goalData.length > 0) {
      const goalInsights = await generateGoalInsights(goalData, incomeData, expenseData);
      allInsights.push(...goalInsights);
    }


    allInsights.sort((a, b) => b.confidence - a.confidence);
    
    return allInsights;
  } catch (error) {
    console.error('❌ Error getting AI insights:', error);

   
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