import type { Category } from '../models';

/** Translate function shape (compatible with i18next's `t`). */
type Translate = (key: string) => string;

/**
 * Resolves a category's display name. Default (system) categories persist a localization
 * key in `name`, so they re-translate when the locale changes; user categories store a
 * literal name and are returned as-is. Keeps localization concerns out of the DB rows.
 */
export function resolveCategoryName(
  category: Pick<Category, 'name' | 'isDefault'>,
  t: Translate,
): string {
  return category.isDefault ? t(category.name) : category.name;
}
