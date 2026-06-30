import { categoryRepository } from '@/database';
import { useAsync } from '@/hooks';

/**
 * Business hook for the Home screen. All data access / logic lives here so the screen
 * stays presentational. This is the reference pattern: screens never call repositories
 * or hold business logic directly.
 */
export function useHomeOverview() {
  const { data, status, error, isLoading, run } = useAsync(() => categoryRepository.findAll(), {
    immediate: true,
  });

  return {
    categories: data ?? [],
    categoryCount: data?.length ?? 0,
    status,
    error,
    isLoading,
    refresh: run,
  };
}
