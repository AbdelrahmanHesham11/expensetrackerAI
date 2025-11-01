'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface GoalData {
  title: string;
  target: number;
  deadline?: string | null;
  progress: number;
}

interface GoalResult {
  data?: GoalData;
  error?: string;
}

async function addGoal(formData: FormData): Promise<GoalResult> {
  const titleValue = formData.get('title');
  const targetValue = formData.get('target');
  const deadlineValue = formData.get('deadline');

  // Validate input
  if (!titleValue || !targetValue) {
    return { error: 'Title and target amount are required' };
  }

  const title: string = titleValue.toString();
  const target: number = parseFloat(targetValue.toString());
  if (isNaN(target) || target <= 0) {
    return { error: 'Target must be a valid positive number' };
  }

  let deadline: string | null = null;
  if (deadlineValue && deadlineValue.toString().trim() !== '') {
    try {
      const inputDate = deadlineValue.toString();
      const [year, month, day] = inputDate.split('-');
      const dateObj = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
      );
      deadline = dateObj.toISOString();
    } catch (error) {
      console.error('Invalid deadline format:', error);
      return { error: 'Invalid deadline format' };
    }
  }

  // Get logged in user
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const createdGoal = await db.goal.create({
      data: {
        title,
        target,
        deadline,
        userId,
      },
    });

    const goalData: GoalData = {
      title: createdGoal.title,
      target: createdGoal.target,
      deadline: createdGoal.deadline
        ? createdGoal.deadline.toISOString()
        : null,
      progress: createdGoal.progress,
    };

    revalidatePath('/');

    return { data: goalData };
  } catch (error) {
    console.error('Error adding goal:', error);
    return { error: 'An unexpected error occurred while adding the goal.' };
  }
}

export default addGoal;
