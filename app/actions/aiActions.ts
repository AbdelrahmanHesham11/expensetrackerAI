'use server';

import { ExpenseRecord, Goal } from '@/types/finance';


import {
  analyzeExpenses,
  generateGoalSuggestions
} from '@/lib/ai';

export async function analyzeExpensesAction(
  expenses: ExpenseRecord[]
) {
  return analyzeExpenses(expenses);
}

export async function generateGoalSuggestionsAction(
  goals: Goal[],
  income: number,
  monthlyExpenses: number
) {
  return generateGoalSuggestions(goals, income, monthlyExpenses);
}
