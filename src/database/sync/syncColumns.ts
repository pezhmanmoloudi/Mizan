/**
 * Sync-ready column contract. Every table includes these so a future cloud-sync engine
 * can do last-write-wins / soft-delete reconciliation without schema changes:
 *  - created_at / updated_at: conflict ordering
 *  - deleted_at: soft delete (tombstone) instead of hard delete
 *  - sync_status: 'local' | 'pending' | 'synced'
 */
export const SYNC_COLUMNS_SQL = `
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  sync_status TEXT NOT NULL DEFAULT 'local'
`;

export type SyncStatus = 'local' | 'pending' | 'synced';
