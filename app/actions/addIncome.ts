'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface IncomeData {
  amount: number;
  description?: string;
  date: string;
}

interface IncomeResult {
  data?: IncomeData;
  error?: string;
}

async function addIncome(formData: FormData): Promise<IncomeResult> {
  const amountValue = formData.get('amount');
  const descriptionValue = formData.get('description');
  const dateValue = formData.get('date');

  // Check for required values
  if (!amountValue || !dateValue) {
    return { error: 'Amount and date are required' };
  }

  const amount: number = parseFloat(amountValue.toString());
  const description: string = descriptionValue?.toString() || '';
  
  // Convert date to ISO-8601 format (same pattern as your addExpenseRecord)
  let date: string;
  try {
    const inputDate = dateValue.toString();
    const [year, month, day] = inputDate.split('-');
    const dateObj = new Date(
      Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
    );
    date = dateObj.toISOString();
  } catch (error) {
    console.error('Invalid date format:', error);
    return { error: 'Invalid date format' };
  }

  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return { error: 'Please enter a valid amount' };
  }

  // Get logged in user
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // Create new income record
    const createdIncome = await db.income.create({
      data: {
        amount,
        description,
        date,
        userId,
      },
    });

    const incomeData: IncomeData = {
      amount: createdIncome.amount,
      description: createdIncome.description || '',
      date: createdIncome.date?.toISOString() || date,
    };

    revalidatePath('/');
    return { data: incomeData };
  } catch (error) {
    console.error('Error adding income record:', error);
    return {
      error: 'An unexpected error occurred while adding the income record.',
    };
  }
}

export default addIncome;