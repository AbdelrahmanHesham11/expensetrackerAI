'use server';
import OpenAI from 'openai';
interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'ExpenseTracker AI',
  },
});

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'tip';
  title: string;
  message: string;
  action?: string;
  confidence: number;
}


export interface IncomeRecord{
  id: string;
  amount: number;
  description?: string;
  date: string;
}



export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    // Prepare expense data for AI analysis
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

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    // Clean the response by removing markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, '')
        .replace(/\s*```$/, '');
    }

    // Parse AI response
    const insights = JSON.parse(cleanedResponse);

    // Add IDs and ensure proper format
    const formattedInsights = insights.map(
      (insight: RawInsight, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        type: insight.type || 'info',
        title: insight.title || 'AI Insight',
        message: insight.message || 'Analysis complete',
        action: insight.action,
        confidence: insight.confidence || 0.8,
      })
    );

    return formattedInsights;
  } catch (error) {
    console.error('❌ Error generating AI insights:', error);

    // Fallback to mock insights if AI fails
    return [
      {
        id: 'fallback-1',
        type: 'info',
        title: 'AI Analysis Unavailable',
        message:
          'Unable to generate personalized insights at this time. Please try again later.',
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        {
          role: 'system',
          content:
            'You are an expense categorization AI. Categorize expenses into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with only the category name.',
        },
        {
          role: 'user',
          content: `Categorize this expense: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

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

    const finalCategory = validCategories.includes(category || '')
      ? category!
      : 'Other';
    return finalCategory;
  } catch (error) {
    console.error('❌ Error categorizing expense:', error);
    return 'Other';
  }
}
export async function generateAIAnswer(
  question: string,
  context: { expenses: ExpenseRecord[]; incomes: IncomeRecord[] }
): Promise<string> {
  try {
    const expensesSummary = context.expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const incomesSummary = context.incomes.map((income) => ({
      amount: income.amount,
      description: income.description,
      date: income.date,
    }));

    // Calculate totals for context
    const totalIncome = context.incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = context.expenses.reduce((sum, expense) => sum + expense.amount, 0);
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

Provide a comprehensive answer that:
1. Addresses the specific question directly
2. Uses concrete data from both income and expenses when possible
3. Considers the financial context (income vs expenses, savings rate, etc.)
4. Offers actionable advice
5. Keeps the response concise but informative (2-3 sentences)
    
Return only the answer text, no additional formatting.`;

    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful financial advisor AI that provides specific, actionable answers based on comprehensive financial data including both income and expenses. Be concise but thorough.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    return response.trim();
  } catch (error) {
    console.error('❌ Error generating AI answer:', error);
    return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
  }
}
export async function generateFinanceInsight(
  expenses: ExpenseRecord[],
  incomes: IncomeRecord[]
): Promise<AIInsight[]>{
  try {
    const expensesSummary=expenses.map((expense)=>({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,

    }));
    const incomesSummary=incomes.map((income)=>({
      amount: income.amount,
      description: income.description,
      date: income.date,
    }));
    const prompt= `You are a financial advisor AI. 
Analyze the following income and expense data together and return 4–5 actionable insights. 
Focus on both cash flow and spending habits.

Return ONLY a JSON array of objects in this format:
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
${JSON.stringify(expensesSummary, null, 2)}

Insights should cover:
1. Income vs Expense ratio (e.g. % of income spent)
2. Savings opportunities (how much is left, possible saving rate)
3. Expense categories relative to income (e.g. dining out = 20% of income)
4. Trends or risks (overspending, low income months)
5. Positive reinforcement if savings are high

Return only valid JSON array, no explanations or extra text.`;

    const completion = await openai.chat.completions.create({
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
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from AI');

    // Clean response
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const insights = JSON.parse(cleanedResponse);

    const formattedInsights = insights.map((insight: RawInsight, index: number) => ({
      id: `finance-ai-${Date.now()}-${index}`,
      type: insight.type || 'info',
      title: insight.title || 'Finance Insight',
      message: insight.message || 'Analysis complete',
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));

    return formattedInsights;
  } catch (error) {
    console.error('❌ Error generating Finance AI insights:', error);
    return [
      {
        id: 'finance-fallback-1',
        type: 'info',
        title: 'AI Finance Insights Unavailable',
        message:
          'Unable to generate finance insights at this time. Please try again later.',
        action: 'Refresh insights',
        confidence: 0.5,
      },
    ];
  }
}

