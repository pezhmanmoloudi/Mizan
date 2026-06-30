import type { SyncMeta } from '@/types';

import type { SyncStatus } from '../sync/syncColumns';

/** The sync/audit columns present on every persisted row (snake_case). */
export type SyncMetaRow = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sync_status: string;
};

/** Map the shared sync columns from a raw row to the camelCase model shape. */
export function mapSyncMeta(row: SyncMetaRow): SyncMeta {
  return {
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
    syncStatus: row.sync_status as SyncStatus,
  };
}

/** SQLite has no boolean type; booleans are stored as 0/1 integers. */
export function intToBool(value: number): boolean {
  return value === 1;
}

export function boolToInt(value: boolean): 0 | 1 {
  return value ? 1 : 0;
}
