"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import RecordHistory from "./RecordHistory";

export default function RecordHistoryClient() {
  const { currency } = useCurrency();
  return <RecordHistory currency={currency} />;
}
