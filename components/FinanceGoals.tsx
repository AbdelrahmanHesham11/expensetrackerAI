'use client';
import { useEffect, useRef, useState } from 'react';
import addGoal from '@/app/actions/addGoal';
import getGoals from '@/app/actions/getGoals';
import deleteGoal from '@/app/actions/deleteGoal';
import updateGoal from '@/app/actions/updateGoal';
import { useCurrency } from '@/contexts/CurrencyContext';


interface Goal {
  id: string;
  title: string;
  target: number;
  progress: number;
  deadline?: string;
}

interface FinanceGoalsProps {
  expenses?: ExpenseRecord[];
  currentIncome?: number;
  monthlyExpenses?: number;
}

const FinanceGoals: React.FC<FinanceGoalsProps> = ({
  expenses = [],
  currentIncome = 0,
  monthlyExpenses = 0,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { currency } = useCurrency();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState(0);
  const [deadline, setDeadline] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<AIFinanceGoal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch goals from database
  const fetchGoals = async () => {
    const { data, error } = await getGoals();
    if (!error && data) setGoals(data);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Add new goal
  const handleAddGoal = async (formData: FormData) => {
    setIsLoading(true);
    formData.set('title', title);
    formData.set('target', target.toString());
    if (deadline) formData.set('deadline', deadline);

    const { error } = await addGoal(formData);
    if (!error) {
      formRef.current?.reset();
      setTitle('');
      setTarget(0);
      setDeadline('');
      fetchGoals();
    }
    setIsLoading(false);
  };

  // Delete goal
  const handleDelete = async (id: string) => {
    await deleteGoal(id);
    fetchGoals();
  };

  // Update progress
  const handleUpdateProgress = async (id: string, newProgress: number) => {
    await updateGoal({ id, progress: newProgress });
    fetchGoals();
  };

  // Run AI analysis
  const runAIAnalysis = async () => {
    setIsAnalyzing(true);

    // Generate insights from expenses
    const insights = await analyzeExpenses(expenses);

    // Generate AI suggested goals
    const suggestions = await generateGoalSuggestions(goals, currentIncome, monthlyExpenses);

    setAiInsights(insights);
    setAiSuggestions(suggestions);
    setIsAnalyzing(false);
  };

  // Optional: auto-run AI whenever income/expenses change
  useEffect(() => {
    if (currentIncome > 0 || monthlyExpenses > 0) {
      runAIAnalysis();
    }
  }, [currentIncome, monthlyExpenses, expenses]);

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-slate-700/50">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        🎯 Financial Goals
      </h3>

      {/* Add Goal Form */}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          handleAddGoal(formData);
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Goal Title (e.g. Travel ✈️)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm"
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={(e) => setTarget(parseFloat(e.target.value) || 0)}
          className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm"
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="col-span-full bg-gradient-to-r from-slate-600 via-blue-500 to-indigo-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition"
        >
          {isLoading ? 'Adding...' : 'Add Goal'}
        </button>
      </form>

      {/* AI Analysis Button */}
      <div className="mb-6">
        <button
          onClick={runAIAnalysis}
          disabled={isAnalyzing || goals.length === 0}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600"
        >
          {isAnalyzing ? 'Analyzing...' : '🔮 Analyze My Goals with AI'}
        </button>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">AI Insights</h4>
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-sm"
              >
                <strong>{insight.title}</strong>: {insight.message}
                {insight.action && (
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    👉 {insight.action}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* AI Suggested Goals */}
        {aiSuggestions.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-md font-semibold text-gray-900 dark:text-gray-100">
              AI Suggested Goals
            </h4>
            {aiSuggestions.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm"
              >
                <strong>{s.title}</strong> — Target: {currency}{s.targetAmount.toFixed(2)}
                <br />
                Deadline: {s.deadline || 'No deadline'}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const percentage = Math.min((goal.progress / goal.target) * 100, 100);
          return (
            <div
              key={goal.id}
              className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20 border shadow-sm"
            >
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{goal.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Target: {currency}{goal.target.toFixed(2)}
              </p>
              {goal.deadline && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Deadline: {goal.deadline}
                </p>
              )}

              {/* Circle Progress */}
              <div className="flex items-center gap-4 mt-4">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full">
                    <circle
                      className="text-gray-200 dark:text-gray-700"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="32"
                      cx="40"
                      cy="40"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - percentage / 100)}`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="32"
                      cx="40"
                      cy="40"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {Math.round(percentage)}%
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Saved: {currency}{goal.progress.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleUpdateProgress(goal.id, goal.progress + 100)}
                    className="mt-2 text-xs px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    +100 {currency}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinanceGoals;
