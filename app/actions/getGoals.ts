'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

interface GoalData {
  id: string;
  title: string;
  target: number;
  deadline?: string | null;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

interface GoalResult {
  data?: GoalData[];
  error?: string;
}

async function getGoals(): Promise<GoalResult> {
  // Get logged-in user
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const goals = await db.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const goalData: GoalData[] = goals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      target: goal.target,
      deadline: goal.deadline ? goal.deadline.toISOString() : null,
      progress: goal.progress,
      createdAt: goal.createdAt.toISOString(),
      updatedAt: goal.updatedAt.toISOString(),
    }));

    return { data: goalData };
  } catch (error) {
    console.error('Error fetching goals:', error);
    return { error: 'An unexpected error occurred while fetching goals.' };
  }
}

export default getGoals;
