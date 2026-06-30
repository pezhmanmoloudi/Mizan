import type { ID, WithSyncMeta } from '@/types';

/**
 * Domain model (camelCase) for an app user. Offline-first apps start with a local guest
 * user (`isGuest: true`); a future auth flow promotes it or links a real account.
 */
export type User = WithSyncMeta<{
  id: ID;
  name: string;
  email: string | null;
  isGuest: boolean;
}>;

/** Raw row shape as stored in SQLite (snake_case). */
export type UserRow = {
  id: string;
  name: string;
  email: string | null;
  is_guest: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sync_status: string;
};

/** Fields a caller supplies when creating a user; the rest are managed by the repo. */
export type NewUser = {
  id?: ID;
  name: string;
  email?: string | null;
  isGuest?: boolean;
};
