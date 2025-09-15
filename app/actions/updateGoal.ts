'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface UpdateGoalInput {
  id: string;
  title?: string;
  target?: number;
  deadline?: string | null;
  progress?: number;
}

interface UpdateResult {
  success?: boolean;
  error?: string;
}

async function updateGoal(data: UpdateGoalInput): Promise<UpdateResult> {
  const { id, title, target, deadline, progress } = data;

  if (!id) {
    return { error: 'Goal ID is required' };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // Ensure the goal belongs to the user
    const existingGoal = await db.goal.findUnique({
      where: { id },
    });

    if (!existingGoal || existingGoal.userId !== userId) {
      return { error: 'Goal not found or not authorized' };
    }

    let deadlineISO: string | null | undefined = undefined;
    if (deadline !== undefined) {
      if (deadline === null) {
        deadlineISO = null;
      } else {
        try {
          const [year, month, day] = deadline.split('-');
          const dateObj = new Date(
            Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), 12, 0, 0)
          );
          deadlineISO = dateObj.toISOString();
        } catch (error) {
          console.error('Invalid deadline format:', error);
          return { error: 'Invalid deadline format' };
        }
      }
    }

    await db.goal.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(target !== undefined && { target }),
        ...(deadlineISO !== undefined && { deadline: deadlineISO }),
        ...(progress !== undefined && { progress }),
      },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error updating goal:', error);
    return { error: 'An unexpected error occurred while updating the goal.' };
  }
}

export default updateGoal;
