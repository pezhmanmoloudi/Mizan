/** Shared primitive types used across layers. */

/** ISO-8601 timestamp string. */
export type ISODateString = string;

/** Unique identifier (UUID/string id). */
export type ID = string;

/** Fields every persisted, sync-ready entity carries. See database/sync. */
export type SyncMeta = {
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  syncStatus: 'local' | 'synced' | 'pending';
};

export type WithSyncMeta<T> = T & SyncMeta;

/** Make selected keys optional. */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
