import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import {
  type Category,
  type CategoryPatch,
  categoryRepository,
  type EntryType,
  type NewCategory,
} from '@/database';

import {
  initialRequestState,
  memoizeOne,
  normalizeError,
  type RequestState,
  runRequest,
} from '../shared';

/**
 * Reactive projection of the `categories` table. Components read categories from here
 * instead of calling the repository directly; the store is the single subscription point so
 * the UI re-renders when categories change. All persistence goes through `categoryRepository`
 * — no SQL here.
 *
 * Mutation strategy: create/update are pessimistic-but-fast (await the fast local write, then
 * commit the returned model), since there is no remote round-trip to hide. `remove` is
 * optimistic (drop from state immediately, restore on failure) because that latency is the
 * one a user would notice.
 */
type CategoriesState = RequestState & {
  categories: Category[];
};

type CategoriesActions = {
  load: () => Promise<void>;
  create: (input: NewCategory) => Promise<Category | null>;
  update: (id: string, patch: CategoryPatch) => Promise<Category | null>;
  remove: (id: string) => Promise<void>;
  reset: () => void;
};

export type CategoriesStore = CategoriesState & CategoriesActions;

const initialState: CategoriesState = {
  ...initialRequestState,
  categories: [],
};

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  ...initialState,

  load: async () => {
    await runRequest(
      (s) => set(s),
      async () => {
        const categories = await categoryRepository.findAll();
        set({ categories });
      },
    );
  },

  create: async (input) => {
    try {
      const created = await categoryRepository.create(input);
      set((s) => ({ categories: [...s.categories, created] }));
      return created;
    } catch (error) {
      set({ error: normalizeError(error) });
      return null;
    }
  },

  update: async (id, patch) => {
    try {
      const updated = await categoryRepository.update(id, patch);
      if (updated) {
        set((s) => ({ categories: s.categories.map((c) => (c.id === id ? updated : c)) }));
      }
      return updated;
    } catch (error) {
      set({ error: normalizeError(error) });
      return null;
    }
  },

  remove: async (id) => {
    const previous = get().categories;
    set({ categories: previous.filter((c) => c.id !== id) });
    try {
      await categoryRepository.softDelete(id);
    } catch (error) {
      set({ categories: previous, error: normalizeError(error) });
    }
  },

  reset: () => set(initialState),
}));

// --- Derived selectors (memoized on the source array reference) ------------------------
const selectDefaults = memoizeOne((categories: Category[]) =>
  categories.filter((c) => c.isDefault),
);
const selectByType = (type: EntryType) =>
  memoizeOne((categories: Category[]) => categories.filter((c) => c.type === type));
const byIncome = selectByType('income');
const byExpense = selectByType('expense');

// --- Selector hooks --------------------------------------------------------------------
export const useCategories = () => useCategoriesStore((s) => s.categories);
export const useCategoriesStatus = () =>
  useCategoriesStore(useShallow((s) => ({ status: s.status, error: s.error })));
export const useDefaultCategories = () => useCategoriesStore((s) => selectDefaults(s.categories));
export const useCategoriesByType = (type: EntryType) =>
  useCategoriesStore((s) => (type === 'income' ? byIncome : byExpense)(s.categories));
export const useCategoryById = (id: string | null) =>
  useCategoriesStore((s) => s.categories.find((c) => c.id === id) ?? null);
