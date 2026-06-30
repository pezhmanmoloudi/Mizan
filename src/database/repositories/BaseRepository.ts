import type { SQLiteDatabase } from 'expo-sqlite';

import { getDatabase } from '../client';

/**
 * Shared repository surface. Repositories are the ONLY place SQL is written; the rest of
 * the app depends on typed models, which keeps a future sync/storage swap localized.
 *
 * Concrete repositories implement row<->model mapping and entity-specific queries.
 */
export abstract class BaseRepository {
  protected abstract readonly table: string;

  protected db(): Promise<SQLiteDatabase> {
    return getDatabase();
  }

  protected nowIso(): string {
    return new Date().toISOString();
  }
}
