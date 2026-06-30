import type { SQLiteDatabase } from 'expo-sqlite';

import { getDatabase } from '../client';
import { nowIso } from '../utils';

/** Resolves the active database. Injectable so repositories can be unit-tested with a fake. */
export type DatabaseResolver = () => Promise<SQLiteDatabase>;

/**
 * Shared repository surface. Repositories are the ONLY place SQL is written; the rest of
 * the app depends on typed models, which keeps a future sync/storage swap localized.
 *
 * Concrete repositories implement row<->model mapping and entity-specific queries. The
 * default resolver is the app's SQLite singleton; tests pass a fake to exercise the
 * mapping/SQL without a native database.
 */
export abstract class BaseRepository {
  protected abstract readonly table: string;

  constructor(private readonly resolveDb: DatabaseResolver = getDatabase) {}

  protected db(): Promise<SQLiteDatabase> {
    return this.resolveDb();
  }

  protected nowIso(): string {
    return nowIso();
  }
}
