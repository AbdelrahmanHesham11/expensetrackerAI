
export interface ExpenseRecord {
  id: string;
  description: string;
  amount: number;
  date: string;
  category?: string;
}

export interface IncomeRecord {
  id: string;
  amount: number;
  description?: string;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  progress: number;
  deadline?: string;
}
