import type { TransactionRow } from '../models';
import { createFakeDatabase, type FakeDatabase } from '../test/fakeDatabase';
import { TransactionRepository } from './TransactionRepository';

const row: TransactionRow = {
  id: 'txn-1',
  user_id: 'user-1',
  category_id: 'category:food',
  amount: 12.5,
  type: 'expense',
  note: 'Lunch',
  date: '2026-06-30',
  payment_method: 'card',
  created_at: '2026-06-30T10:00:00.000Z',
  updated_at: '2026-06-30T10:00:00.000Z',
  deleted_at: null,
  sync_status: 'local',
};

describe('TransactionRepository', () => {
  let fake: FakeDatabase;
  let repo: TransactionRepository;

  beforeEach(() => {
    fake = createFakeDatabase();
    repo = new TransactionRepository(() => Promise.resolve(fake.db));
  });

  it('findByUser filters by user and maps to the model', async () => {
    fake.getAllAsync.mockResolvedValueOnce([row]);
    const result = await repo.findByUser('user-1');

    const [sql, params] = fake.getAllAsync.mock.calls[0] ?? [];
    expect(sql).toContain('user_id = ?');
    expect(sql).toContain('deleted_at IS NULL');
    expect(params).toEqual(['user-1']);
    expect(result[0]).toMatchObject({
      id: 'txn-1',
      userId: 'user-1',
      categoryId: 'category:food',
      amount: 12.5,
      type: 'expense',
      paymentMethod: 'card',
      syncStatus: 'local',
    });
  });

  it('create persists all columns and defaults note to null', async () => {
    const created = await repo.create({
      id: 'txn-2',
      userId: 'user-1',
      categoryId: 'category:food',
      amount: 5,
      type: 'expense',
      date: '2026-06-30',
      paymentMethod: 'cash',
    });

    const [sql, params] = fake.runAsync.mock.calls[0] ?? [];
    expect(sql).toContain('INSERT INTO transactions');
    expect(params?.[5]).toBeNull(); // note
    expect(created.note).toBeNull();
    expect(created.syncStatus).toBe('local');
  });
});
