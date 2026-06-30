import type { CategoryRow } from '../models';
import { createFakeDatabase, type FakeDatabase } from '../test/fakeDatabase';
import { CategoryRepository } from './CategoryRepository';

const row: CategoryRow = {
  id: 'category:food',
  name: 'categories.defaults.food',
  color: '#FF6B6B',
  icon: 'restaurant',
  type: 'expense',
  is_default: 1,
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
  deleted_at: null,
  sync_status: 'local',
};

describe('CategoryRepository', () => {
  let fake: FakeDatabase;
  let repo: CategoryRepository;

  beforeEach(() => {
    fake = createFakeDatabase();
    repo = new CategoryRepository(() => Promise.resolve(fake.db));
  });

  it('findAll maps rows to models and excludes soft-deleted', async () => {
    fake.getAllAsync.mockResolvedValueOnce([row]);
    const result = await repo.findAll();

    expect(fake.getAllAsync.mock.calls[0]?.[0]).toContain('deleted_at IS NULL');
    expect(result).toEqual([
      {
        id: 'category:food',
        name: 'categories.defaults.food',
        color: '#FF6B6B',
        icon: 'restaurant',
        type: 'expense',
        isDefault: true,
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
        deletedAt: null,
        syncStatus: 'local',
      },
    ]);
  });

  it('findById returns null when no row', async () => {
    fake.getFirstAsync.mockResolvedValueOnce(null);
    expect(await repo.findById('missing')).toBeNull();
  });

  it('create inserts with a generated id and returns the model', async () => {
    const created = await repo.create({ name: 'Coffee', color: '#000000', type: 'expense' });

    const [sql, params] = fake.runAsync.mock.calls[0] ?? [];
    expect(sql).toContain('INSERT INTO categories');
    // id, name, color, icon, type, is_default, created_at, updated_at
    expect(params).toHaveLength(8);
    expect(params?.[1]).toBe('Coffee');
    expect(params?.[5]).toBe(0); // isDefault -> 0
    expect(created.id).toBeTruthy();
    expect(created.syncStatus).toBe('local');
    expect(created.isDefault).toBe(false);
  });

  it('softDelete tombstones the row and marks it pending', async () => {
    await repo.softDelete('category:food');
    const [sql, params] = fake.runAsync.mock.calls[0] ?? [];
    expect(sql).toContain('deleted_at = ?');
    expect(sql).toContain("sync_status = 'pending'");
    expect(params?.[2]).toBe('category:food');
  });
});
