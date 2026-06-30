import { createLogger } from '@/utils';

import { getDatabase } from './client';
import { runMigrations } from './migrations';

const log = createLogger('database.service');

let initialized = false;

/**
 * Database lifecycle facade. Call `init()` once during app bootstrap; it opens the
 * connection and brings the schema up to date. Feature code uses repositories, not this.
 */
export const databaseService = {
  async init(): Promise<void> {
    if (initialized) return;
    const db = await getDatabase();
    await runMigrations(db);
    initialized = true;
    log.info('Database ready');
  },

  /** Run a set of statements atomically. */
  async transaction(work: () => Promise<void>): Promise<void> {
    const db = await getDatabase();
    await db.withTransactionAsync(work);
  },

  isReady(): boolean {
    return initialized;
  },
};
