import type { ID, WithSyncMeta } from '@/types';

import type { EntryType } from '../types';

/** Domain model (camelCase) for a spending category. Reference entity for the DB layer. */
export type Category = WithSyncMeta<{
  id: ID;
  /**
   * Display name. For default (system) categories this holds a localization key (e.g.
   * `categories.defaults.food`) resolved at render time; for user categories it is the
   * literal name. See `database/seeds` and `resolveCategoryName`.
   */
  name: string;
  color: string;
  icon: string | null;
  type: EntryType;
  isDefault: boolean;
}>;

/** Raw row shape as stored in SQLite (snake_case). Repositories map row <-> model. */
export type CategoryRow = {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  type: string;
  is_default: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sync_status: string;
};

/** Fields a caller supplies when creating a category; the rest are managed by the repo. */
export type NewCategory = {
  id?: ID;
  name: string;
  color: string;
  icon?: string | null;
  type: EntryType;
  isDefault?: boolean;
};
