import { act, renderHook } from '@testing-library/react-native';

import type { Category } from '@/database';
import { categoryRepository } from '@/database';

import { useCategoriesByType, useCategoriesStore, useDefaultCategories } from './categoriesStore';

jest.mock('@/database', () => ({
  categoryRepository: {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  },
}));

const findAll = categoryRepository.findAll as jest.Mock;
const create = categoryRepository.create as jest.Mock;
const update = categoryRepository.update as jest.Mock;
const softDelete = categoryRepository.softDelete as jest.Mock;

const cat = (over: Partial<Category>): Category => ({
  id: 'c1',
  name: 'Food',
  color: '#fff',
  icon: null,
  type: 'expense',
  isDefault: false,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
  deletedAt: null,
  syncStatus: 'local',
  ...over,
});

describe('categoriesStore', () => {
  beforeEach(() => {
    useCategoriesStore.getState().reset();
    [findAll, create, update, softDelete].forEach((m) => m.mockReset());
  });

  it('load populates categories and reaches success', async () => {
    findAll.mockResolvedValue([cat({ id: 'a' }), cat({ id: 'b' })]);
    await useCategoriesStore.getState().load();
    expect(useCategoriesStore.getState().categories).toHaveLength(2);
    expect(useCategoriesStore.getState().status).toBe('success');
  });

  it('load failure sets error status', async () => {
    findAll.mockRejectedValue(new Error('boom'));
    await useCategoriesStore.getState().load();
    expect(useCategoriesStore.getState().status).toBe('error');
    expect(useCategoriesStore.getState().error).toBe('boom');
  });

  it('create appends the returned model', async () => {
    const created = cat({ id: 'new', name: 'Coffee' });
    create.mockResolvedValue(created);
    await useCategoriesStore.getState().create({ name: 'Coffee', color: '#000', type: 'expense' });
    expect(useCategoriesStore.getState().categories).toContainEqual(created);
  });

  it('update replaces the matching category', async () => {
    findAll.mockResolvedValue([cat({ id: 'c1', name: 'Food' })]);
    await useCategoriesStore.getState().load();
    update.mockResolvedValue(cat({ id: 'c1', name: 'Groceries' }));
    await useCategoriesStore.getState().update('c1', { name: 'Groceries' });
    expect(useCategoriesStore.getState().categories[0]?.name).toBe('Groceries');
  });

  it('remove is optimistic and rolls back on failure', async () => {
    findAll.mockResolvedValue([cat({ id: 'c1' }), cat({ id: 'c2' })]);
    await useCategoriesStore.getState().load();

    softDelete.mockResolvedValue(undefined);
    await useCategoriesStore.getState().remove('c1');
    expect(useCategoriesStore.getState().categories.map((c) => c.id)).toEqual(['c2']);

    softDelete.mockRejectedValue(new Error('locked'));
    await useCategoriesStore.getState().remove('c2');
    expect(useCategoriesStore.getState().categories.map((c) => c.id)).toEqual(['c2']); // restored
    expect(useCategoriesStore.getState().error).toBe('locked');
  });

  it('derived selectors split by flag/type and return a stable ref across rerenders', async () => {
    const income = cat({ id: 'i', type: 'income' });
    const expenseDefault = cat({ id: 'e', type: 'expense', isDefault: true });
    findAll.mockResolvedValue([income, expenseDefault]);
    await act(async () => {
      await useCategoriesStore.getState().load();
    });

    const defaults = renderHook(() => useDefaultCategories());
    expect(defaults.result.current).toEqual([expenseDefault]);
    const firstRef = defaults.result.current;
    defaults.rerender({});
    expect(defaults.result.current).toBe(firstRef); // memoized — no new array on rerender

    const incomeCats = renderHook(() => useCategoriesByType('income'));
    expect(incomeCats.result.current).toEqual([income]);
  });
});
