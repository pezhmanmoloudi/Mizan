import type { Transaction } from '@/database';

import { computeMonthlyTotals, computeTotals, filterByMonth, groupByDate } from './selectors';

const tx = (over: Partial<Transaction>): Transaction => ({
  id: 'id',
  userId: 'u1',
  categoryId: 'c1',
  amount: 0,
  type: 'expense',
  note: null,
  date: '2026-06-01',
  paymentMethod: 'cash',
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
  deletedAt: null,
  syncStatus: 'local',
  ...over,
});

describe('transactions/selectors', () => {
  it('computeTotals sums income/expense and balance', () => {
    const totals = computeTotals([
      tx({ type: 'income', amount: 100 }),
      tx({ type: 'expense', amount: 30 }),
      tx({ type: 'expense', amount: 20 }),
    ]);
    expect(totals).toEqual({ income: 100, expense: 50, balance: 50 });
  });

  it('filterByMonth keeps only the matching YYYY-MM', () => {
    const list = [tx({ date: '2026-06-15' }), tx({ date: '2026-07-02' })];
    expect(filterByMonth(list, '2026-06')).toHaveLength(1);
  });

  it('computeMonthlyTotals restricts totals to the month', () => {
    const list = [
      tx({ type: 'income', amount: 100, date: '2026-06-10' }),
      tx({ type: 'expense', amount: 40, date: '2026-07-10' }),
    ];
    expect(computeMonthlyTotals(list, '2026-06')).toEqual({
      income: 100,
      expense: 0,
      balance: 100,
    });
  });

  it('groupByDate buckets by calendar day, newest first', () => {
    const groups = groupByDate([
      tx({ id: 'a', date: '2026-06-01' }),
      tx({ id: 'b', date: '2026-06-03' }),
      tx({ id: 'c', date: '2026-06-03' }),
    ]);
    expect(groups.map((g) => g.date)).toEqual(['2026-06-03', '2026-06-01']);
    expect(groups[0]?.transactions).toHaveLength(2);
  });
});
