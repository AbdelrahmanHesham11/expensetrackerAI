'use client';
import { useState, useRef } from 'react';
import addIncome from '@/app/actions/addIncome'; 
import { useCurrency } from '@/contexts/CurrencyContext';

const IncomeForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { currency } = useCurrency();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIncome = async (formData: FormData) => {
    setIsLoading(true);
    formData.set('amount', amount.toString());
    formData.set('description', description);
    formData.set('date', date);

    const { error } = await addIncome(formData);
    if (!error) {
      formRef.current?.reset();
      setAmount(0);
      setDescription('');
      setDate('');
      // You might want to trigger a refresh of the balance here
      window.location.reload(); // Simple refresh for now
    }
    setIsLoading(false);
  };

  // Set default date to today
  useState(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  });

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100/50 dark:border-slate-700/50">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        💰 Add Income
      </h3>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          handleAddIncome(formData);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                {currency}
              </span>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="pl-8 pr-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1500.00"
                required
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description (Optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Monthly salary, freelance work, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || amount <= 0}
          className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding Income...' : `Add ${currency}${amount.toFixed(2)} Income`}
        </button>
      </form>

      {/* Quick Amount Buttons */}
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quick amounts:
        </p>
        <div className="flex gap-2 flex-wrap">
          {[500, 1000, 1500, 2000, 2500, 3000].map((quickAmount) => (
            <button
              key={quickAmount}
              onClick={() => setAmount(quickAmount)}
              className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {currency}{quickAmount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncomeForm;