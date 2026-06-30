import type { Result } from '@/utils';

/**
 * Cloud sync contract. The app depends on this interface, never a concrete client, so a
 * backend can be introduced later (or swapped) without touching features. Intentionally
 * unimplemented in the foundation.
 */
export type SyncOutcome = { pushed: number; pulled: number };

export interface SyncService {
  isEnabled(): boolean;
  sync(): Promise<Result<SyncOutcome, Error>>;
}
