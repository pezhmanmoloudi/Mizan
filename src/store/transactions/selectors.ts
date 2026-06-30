import type { EntryType, Transaction } from '@/database';

/** Year-month key (`YYYY-MM`) for the current calendar month. */
export function currentYearMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

export type Totals = {
  income: number;
  expense: number;
  balance: number;
};

/** Sum income/expense (and balance = income − expense) over the given transactions. */
export function computeTotals(transactions: Transaction[]): Totals {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, balance: income - expense };
}

/** Transactions whose `date` falls in the given `YYYY-MM` month. */
export function filterByMonth(transactions: Transaction[], yearMonth: string): Transaction[] {
  return transactions.filter((t) => t.date.slice(0, 7) === yearMonth);
}

/** Totals restricted to a single month. */
export function computeMonthlyTotals(transactions: Transaction[], yearMonth: string): Totals {
  return computeTotals(filterByMonth(transactions, yearMonth));
}

export type TransactionGroup = {
  date: string; // YYYY-MM-DD
  transactions: Transaction[];
};

/** Group transactions by calendar day, newest day first (input is assumed date-desc). */
export function groupByDate(transactions: Transaction[]): TransactionGroup[] {
  const groups = new Map<string, Transaction[]>();
  for (const t of transactions) {
    const day = t.date.slice(0, 10);
    const bucket = groups.get(day);
    if (bucket) bucket.push(t);
    else groups.set(day, [t]);
  }
  return Array.from(groups, ([date, items]) => ({ date, transactions: items })).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export const filterByType = (transactions: Transaction[], type: EntryType): Transaction[] =>
  transactions.filter((t) => t.type === type);
