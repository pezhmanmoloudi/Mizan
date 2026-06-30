import type { EntryType } from '../types';
import { prefixedId } from '../utils';

/**
 * Canonical list of default categories shipped with the app. Localization-ready: each
 * entry carries a stable `id` and a `nameKey` (an i18n key) instead of a translated
 * string, so the same row renders correctly in every locale. `name` on the persisted row
 * stores this key; `resolveCategoryName` translates it at display time.
 *
 * To extend: append an entry here (applies to fresh installs). To roll the change out to
 * existing installs, add a new migration that seeds the additional rows.
 */
export type DefaultCategory = {
  id: string;
  /** i18n key under `categories.defaults.*`. */
  nameKey: string;
  icon: string;
  color: string;
  type: EntryType;
};

const category = (slug: string, icon: string, color: string): DefaultCategory => ({
  id: prefixedId('category', slug),
  nameKey: `categories.defaults.${slug}`,
  icon,
  color,
  type: 'expense',
});

export const DEFAULT_CATEGORIES: readonly DefaultCategory[] = [
  category('food', 'restaurant', '#FF6B6B'),
  category('transport', 'directions-car', '#4F7CFF'),
  category('shopping', 'shopping-bag', '#FFA502'),
  category('bills', 'receipt-long', '#2ED573'),
  category('health', 'favorite', '#FF4757'),
  category('entertainment', 'movie', '#A55EEA'),
  category('other', 'category', '#7F8C8D'),
];
