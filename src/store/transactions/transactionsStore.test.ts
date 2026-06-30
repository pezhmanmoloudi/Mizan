import { act, renderHook } from '@testing-library/react-native';

import type { NewTransaction, Transaction } from '@/database';
import { transactionRepository } from '@/database';

import {
  useGroupedTransactions,
  useRecentTransactions,
  useTransactionsStore,
} from './transactionsStore';

jest.mock('@/database', () => ({
  transactionRepository: {
    findByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  },
}));

const findByUser = transactionRepository.findByUser as jest.Mock;
const create = transactionRepository.create as jest.Mock;
const softDelete = transactionRepository.softDelete as jest.Mock;

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

const newTx: NewTransaction = {
  userId: 'u1',
  categoryId: 'c1',
  amount: 50,
  type: 'expense',
  date: '2026-06-10',
  paymentMethod: 'cash',
};

describe('transactionsStore', () => {
  beforeEach(() => {
    useTransactionsStore.getState().reset();
    [findByUser, create, softDelete].forEach((m) => m.mockReset());
  });

  it("load fetches the user's transactions", async () => {
    findByUser.mockResolvedValue([tx({ id: 'a' })]);
    await useTransactionsStore.getState().load('u1');
    expect(findByUser).toHaveBeenCalledWith('u1');
    expect(useTransactionsStore.getState().transactions).toHaveLength(1);
  });

  it('add prepends the created transaction', async () => {
    findByUser.mockResolvedValue([tx({ id: 'a' })]);
    await useTransactionsStore.getState().load('u1');
    create.mockResolvedValue(tx({ id: 'new' }));
    await useTransactionsStore.getState().add(newTx);
    expect(useTransactionsStore.getState().transactions.map((t) => t.id)).toEqual(['new', 'a']);
  });

  it('remove is optimistic and rolls back on failure', async () => {
    findByUser.mockResolvedValue([tx({ id: 'a' }), tx({ id: 'b' })]);
    await useTransactionsStore.getState().load('u1');

    softDelete.mockRejectedValue(new Error('locked'));
    await useTransactionsStore.getState().remove('a');
    expect(useTransactionsStore.getState().transactions.map((t) => t.id)).toEqual(['a', 'b']);
    expect(useTransactionsStore.getState().error).toBe('locked');
  });

  it('grouped selector returns a stable ref across rerenders, recent slices', async () => {
    findByUser.mockResolvedValue([
      tx({ id: 'a', date: '2026-06-03' }),
      tx({ id: 'b', date: '2026-06-01' }),
    ]);
    await act(async () => {
      await useTransactionsStore.getState().load('u1');
    });

    const grouped = renderHook(() => useGroupedTransactions());
    const firstRef = grouped.result.current;
    grouped.rerender({});
    expect(grouped.result.current).toBe(firstRef);

    const recent = renderHook(() => useRecentTransactions(1));
    expect(recent.result.current).toHaveLength(1);
  });
});
