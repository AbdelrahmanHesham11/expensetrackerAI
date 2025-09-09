"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

export default function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();

  const currencies = ["$", "€", "£", "₤", "₺", "₹", "¥", "₱", "﷼", "E£"];

  return (
    <div className="absolute top-4 right-4 z-50">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>
            {cur}
          </option>
        ))}
      </select>
    </div>
  );
}
