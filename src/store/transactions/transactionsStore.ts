import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import {
  type EntryType,
  type NewTransaction,
  type Transaction,
  type TransactionPatch,
  transactionRepository,
} from '@/database';

import {
  initialRequestState,
  memoizeOne,
  normalizeError,
  type RequestState,
  runRequest,
} from '../shared';
import {
  computeMonthlyTotals,
  currentYearMonth,
  filterByType,
  groupByDate,
  type Totals,
  type TransactionGroup,
} from './selectors';

/**
 * Reactive projection of the `transactions` table for the active user. Mirrors the
 * categories store conventions: repository-driven, pessimistic-fast create/update, optimistic
 * remove. Derived selectors (recent, grouped, monthly totals) are memoized so list-heavy
 * screens don't re-render on unrelated state changes.
 *
 * Scope guard: this is projection + derivation only — NO analytics engine.
 */
type TransactionsState = RequestState & {
  transactions: Transaction[];
};

type TransactionsActions = {
  load: (userId: string) => Promise<void>;
  add: (input: NewTransaction) => Promise<Transaction | null>;
  update: (id: string, patch: TransactionPatch) => Promise<Transaction | null>;
  remove: (id: string) => Promise<void>;
  reset: () => void;
};

export type TransactionsStore = TransactionsState & TransactionsActions;

const initialState: TransactionsState = {
  ...initialRequestState,
  transactions: [],
};

export const useTransactionsStore = create<TransactionsStore>((set, get) => ({
  ...initialState,

  load: async (userId) => {
    await runRequest(
      (s) => set(s),
      async () => {
        const transactions = await transactionRepository.findByUser(userId);
        set({ transactions });
      },
    );
  },

  add: async (input) => {
    try {
      const created = await transactionRepository.create(input);
      // findByUser returns date-desc; new rows usually belong at the front.
      set((s) => ({ transactions: [created, ...s.transactions] }));
      return created;
    } catch (error) {
      set({ error: normalizeError(error) });
      return null;
    }
  },

  update: async (id, patch) => {
    try {
      const updated = await transactionRepository.update(id, patch);
      if (updated) {
        set((s) => ({ transactions: s.transactions.map((t) => (t.id === id ? updated : t)) }));
      }
      return updated;
    } catch (error) {
      set({ error: normalizeError(error) });
      return null;
    }
  },

  remove: async (id) => {
    const previous = get().transactions;
    set({ transactions: previous.filter((t) => t.id !== id) });
    try {
      await transactionRepository.softDelete(id);
    } catch (error) {
      set({ transactions: previous, error: normalizeError(error) });
    }
  },

  reset: () => set(initialState),
}));

// --- Derived selectors (memoized on the source array reference) ------------------------
const selectGrouped = memoizeOne(groupByDate);
const selectMonthlyTotals = memoizeOne((txs: Transaction[]) =>
  computeMonthlyTotals(txs, currentYearMonth()),
);
const selectByType = (type: EntryType) =>
  memoizeOne((txs: Transaction[]) => filterByType(txs, type));
const incomeTransactions = selectByType('income');
const expenseTransactions = selectByType('expense');

// --- Selector hooks --------------------------------------------------------------------
export const useTransactions = () => useTransactionsStore((s) => s.transactions);
export const useTransactionsStatus = () =>
  useTransactionsStore(useShallow((s) => ({ status: s.status, error: s.error })));
export const useRecentTransactions = (count: number): Transaction[] =>
  useTransactionsStore(useShallow((s) => s.transactions.slice(0, count)));
export const useGroupedTransactions = (): TransactionGroup[] =>
  useTransactionsStore((s) => selectGrouped(s.transactions));
export const useMonthlyTotals = (): Totals =>
  useTransactionsStore((s) => selectMonthlyTotals(s.transactions));
export const useTransactionsByType = (type: EntryType): Transaction[] =>
  useTransactionsStore((s) =>
    (type === 'income' ? incomeTransactions : expenseTransactions)(s.transactions),
  );
