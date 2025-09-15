'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface DeleteResult {
  success?: boolean;
  error?: string;
}

async function deleteGoal(goalId: string): Promise<DeleteResult> {
  if (!goalId) {
    return { error: 'Goal ID is required' };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    // Ensure the goal belongs to the user
    const existingGoal = await db.goal.findUnique({
      where: { id: goalId },
    });

    if (!existingGoal || existingGoal.userId !== userId) {
      return { error: 'Goal not found or not authorized' };
    }

    await db.goal.delete({
      where: { id: goalId },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting goal:', error);
    return { error: 'An unexpected error occurred while deleting the goal.' };
  }
}

export default deleteGoal;
