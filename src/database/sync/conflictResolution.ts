import type { SyncMeta } from '@/types';

/**
 * Conflict-resolution placeholder for the future cloud-sync engine. No network sync exists
 * yet — this defines the *strategy contract* and a default so the rest of the codebase can
 * be written against a stable abstraction.
 *
 * The default is last-write-wins keyed on `updatedAt`, which pairs with the sync columns
 * (`created_at`/`updated_at`/`deleted_at`) every table carries. A tombstone (`deletedAt`
 * set) always wins over a non-deleted counterpart of the same or older timestamp, so a
 * delete is never silently resurrected.
 */
export type ConflictResolution<T extends SyncMeta> = (local: T, remote: T) => T;

export const lastWriteWins = <T extends SyncMeta>(local: T, remote: T): T => {
  const localTime = Date.parse(local.updatedAt);
  const remoteTime = Date.parse(remote.updatedAt);
  if (remoteTime > localTime) return remote;
  if (localTime > remoteTime) return local;
  // Equal timestamps: prefer the tombstone so deletes aren't resurrected.
  return local.deletedAt ? local : remote;
};
