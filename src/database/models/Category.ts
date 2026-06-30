import type { ID, WithSyncMeta } from '@/types';

/** Domain model (camelCase) for a spending category. Reference entity for the DB layer. */
export type Category = WithSyncMeta<{
  id: ID;
  name: string;
  color: string;
  icon: string | null;
}>;

/** Raw row shape as stored in SQLite (snake_case). Repositories map row <-> model. */
export type CategoryRow = {
  id: string;
  name: string;
  color: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sync_status: string;
};
