import { useEffect } from 'react';

import { useCategories, useCategoriesStatus, useCategoriesStore } from '@/store';

/**
 * Business hook for the Home screen. All data access / logic lives here so the screen stays
 * presentational. This is the reference pattern: screens read from a store (the reactive
 * projection of the local DB), never from repositories directly. Categories are loaded at
 * bootstrap; the mount-time `load()` keeps the hook self-sufficient and refreshes on demand.
 */
export function useHomeOverview() {
  const categories = useCategories();
  const { status, error } = useCategoriesStatus();
  const load = useCategoriesStore((s) => s.load);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    categories,
    categoryCount: categories.length,
    status,
    error,
    isLoading: status === 'pending',
    refresh: load,
  };
}
