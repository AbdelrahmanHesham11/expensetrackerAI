'use server';

import OpenAI from 'openai';
import { differenceInMonths, differenceInWeeks } from 'date-fns';

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

// Simple rate limiter for API calls
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests = 10, timeWindowMs = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  getRetryAfter(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.timeWindow - (Date.now() - oldestRequest));
  }
}

// Create rate limiter instance (10 requests per minute)
const rateLimiter = new RateLimiter(10, 60000);

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'ExpenseTracker AI',
  },
});

// Utility function for API calls with retry logic
async function makeOpenAIRequest(
  requestFn: () => Promise<any>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<any> {
  // Check rate limiter first
  if (!rateLimiter.canMakeRequest()) {
    const retryAfter = rateLimiter.getRetryAfter();
    throw new Error(`Rate limit exceeded. Try again in ${Math.ceil(retryAfter / 1000)} seconds.`);
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      rateLimiter.recordRequest();
      const result = await requestFn();
      return result;
    } catch (error: any) {
      console.log(`❌ API attempt ${attempt + 1} failed:`, error.status || error.message);

      // If it's a 429 error and we have retries left
      if (error.status === 429 && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
        console.log(`⏳ Rate limited, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // If it's the final attempt or non-retryable error, throw
      if (attempt === maxRetries) {
        throw new Error(`Max retries exceeded. Last error: ${error.message}`);
      }
      
      // For non-429 errors, don't retry
      if (error.status !== 429) {
        throw error;
      }
    }
  }
}

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface IncomeRecord {
  id: string;
  amount: number;
  description?: string;
  date: string;
}

export interface GoalRecord {
  id: string;
  title: string;
  target: number;
  deadline?: string | null;
  progress: number;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

// ------------------ Expense Insights ------------------
export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights. 
    Return a JSON array of insights with this structure:
    {
      "type": "warning|info|success|tip",
      "title": "Brief title",
      "message": "Detailed insight message with specific numbers when possible",
      "action": "Actionable suggestion",
      "confidence": 0.8
    }

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Focus on:
    1. Spending patterns (day of week, categories)
    2. Budget alerts (high spending areas)
    3. Money-saving opportunities
    4. Positive reinforcement for good habits

    Return only valid JSON array, no additional text.`;

    const completion = await makeOpenAIRequest(() =>
      openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    );

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');

    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const insights = JSON.parse(cleanedResponse);

    return insights.map((insight: RawInsight, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      type: insight.type || 'info',
      title: insight.title || 'AI Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));
  } catch (error: any) {
    console.error('❌ Error generating AI insights:', error);
    
    // More specific error messages
    let errorMessage = 'Unable to generate personalized insights at this time. Please try again later.';
    if (error.message.includes('Rate limit')) {
      errorMessage = error.message;
    } else if (error.message.includes('Max retries')) {
      errorMessage = 'API is temporarily overloaded. Please try again in a few minutes.';
    }

    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: 'AI Analysis Unavailable',
        message: errorMessage,
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

// ------------------ Expense Categorization ------------------
export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await makeOpenAIRequest(() =>
      openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content:
              'You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with only the category name.',
          },
          { role: 'user', content: `Categorize this expense: "${description}"` },
        ],
        temperature: 0.1,
        max_tokens: 20,
      })
    );

    const category = completion.choices[0].message.content?.trim();
    const validCategories = [
      'Food',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Bills',
      'Healthcare',
      'Other',
    ];

    return validCategories.includes(category || '') ? category! : 'Other';
  } catch (error) {
    console.error('❌ Error categorizing expense:', error);
    return 'Other';
  }
}

// ------------------ AI Q&A ------------------
export async function generateAIAnswer(
  question: string,
  context: { expenses: ExpenseRecord[]; incomes: IncomeRecord[] }
): Promise<string> {
  try {
    const expensesSummary = context.expenses.map((e) => ({
      amount: e.amount,
      category: e.category,
      description: e.description,
      date: e.date,
    }));

    const incomesSummary = context.incomes.map((i) => ({
      amount: i.amount,
      description: i.description,
      date: i.date,
    }));

    const totalIncome = context.incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpenses = context.expenses.reduce((s, e) => s + e.amount, 0);
    const netSavings = totalIncome - totalExpenses;

    const prompt = `Based on the following financial data, provide a detailed and actionable answer to this question: "${question}"

FINANCIAL SUMMARY:
- Total Income: $${totalIncome.toFixed(2)}
- Total Expenses: $${totalExpenses.toFixed(2)}
- Net Savings: $${netSavings.toFixed(2)}

Income Data:
${JSON.stringify(incomesSummary, null, 2)}

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Provide a comprehensive answer (2–3 sentences).`;

    const completion = await makeOpenAIRequest(() =>
      openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful financial advisor AI that provides specific, actionable answers based on financial data. Be concise but thorough.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
      })
    );

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');
    return response.trim();
  } catch (error: any) {
    console.error('❌ Error generating AI answer:', error);
    return error.message.includes('Rate limit') 
      ? `I'm temporarily rate-limited. ${error.message}`
      : "I'm unable to provide a detailed answer at the moment. Please try refreshing.";
  }
}

// ------------------ Finance Insights ------------------
export async function generateFinanceInsight(
  expenses: ExpenseRecord[],
  incomes: IncomeRecord[]
): Promise<AIInsight[]> {
  try {
    const expensesSummary = expenses.map((e) => ({
      amount: e.amount,
      category: e.category,
      description: e.description,
      date: e.date,
    }));
    const incomesSummary = incomes.map((i) => ({
      amount: i.amount,
      description: i.description,
      date: i.date,
    }));

    const prompt = `You are a financial advisor AI. 
Analyze the following income and expense data together and return 4–5 actionable insights. 
Focus on both cash flow and spending habits.

Return ONLY a JSON array with objects like:
{
  "type": "warning|info|success|tip",
  "title": "Short title",
  "message": "Detailed message with numbers and percentages",
  "action": "Clear actionable advice",
  "confidence": 0.8
}

Income Data:
${JSON.stringify(incomesSummary, null, 2)}

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}`;

    const completion = await makeOpenAIRequest(() =>
      openai.chat.completions.create({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a smart financial advisor AI. Always respond with valid JSON only, no extra commentary.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    );

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');

    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const insights = JSON.parse(cleanedResponse);

    return insights.map((insight: RawInsight, index: number) => ({
      id: `finance-ai-${Date.now()}-${index}`,
      type: insight.type || 'info',
      title: insight.title || 'Finance Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));
  } catch (error: any) {
    console.error('❌ Error generating Finance AI insights:', error);
    
    let errorMessage = 'Unable to generate finance insights at this time. Please try again later.';
    if (error.message.includes('Rate limit')) {
      errorMessage = `Rate limited: ${error.message}`;
    }

    return [
      {
        id: 'finance-fallback-1',
        type: 'info',
        title: 'AI Finance Insights Unavailable',
        message: errorMessage,
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

// ------------------ Goal Insights ------------------
export async function generateGoalInsights(
  goals: GoalRecord[],
  incomes: IncomeRecord[],
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const netSavings = totalIncome - totalExpenses;
    const now = new Date();

    return goals.map((goal, index) => {
      const deadline = goal.deadline ? new Date(goal.deadline) : null;
      const remaining = goal.target - goal.progress;

      if (remaining <= 0) {
        return {
          id: `goal-${goal.id}-${index}`,
          type: 'success',
          title: `Goal Achieved: ${goal.title}`,
          message: `Congrats! You've already reached your goal of $${goal.target.toFixed(2)}.`,
          confidence: 1,
        };
      }

      let perMonth = remaining;
      let perWeek = remaining;
      let deadlineText = 'no deadline set';

      if (deadline) {
        const monthsLeft = Math.max(1, differenceInMonths(deadline, now));
        const weeksLeft = Math.max(1, differenceInWeeks(deadline, now));
        perMonth = remaining / monthsLeft;
        perWeek = remaining / weeksLeft;
        deadlineText = deadline.toDateString();
      }

      return {
        id: `goal-${goal.id}-${index}`,
        type: remaining > netSavings ? 'warning' : 'info',
        title: `Goal: ${goal.title}`,
        message: `To reach your goal of $${goal.target.toFixed(
          2
        )} by ${deadlineText}, you need to save about $${perMonth.toFixed(
          2
        )}/month (~$${perWeek.toFixed(2)}/week).`,
        confidence: 0.9,
      };
    });
  } catch (error) {
    console.error('❌ Error generating Goal AI insights:', error);
    return [
      {
        id: 'goal-fallback-1',
        type: 'info',
        title: 'Goal Insights Unavailable',
        message: 'Unable to generate goal insights at this time.',
        confidence: 0.5,
      },
    ];
  }
}