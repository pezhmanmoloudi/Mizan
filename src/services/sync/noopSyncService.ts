import { env } from '@/constants';
import { ok, type Result } from '@/utils';

import type { SyncOutcome, SyncService } from './types';

/** Placeholder so DI wiring and offline-first flows work before a real backend exists. */
export const noopSyncService: SyncService = {
  isEnabled: () => env.syncEnabled,
  async sync(): Promise<Result<SyncOutcome, Error>> {
    return ok({ pushed: 0, pulled: 0 });
  },
};
