import type { SQLiteDatabase } from 'expo-sqlite';

import { SYNC_COLUMNS_SQL } from '../sync/syncColumns';
import type { Migration } from './types';

/**
 * Initial schema. Seeds the `categories` reference table only — transactions and the
 * rest of the domain are intentionally left for feature work.
 */
export const migration0001: Migration = {
  version: 1,
  name: 'init',
  up: async (db: SQLiteDatabase) => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT,
        ${SYNC_COLUMNS_SQL}
      );
      CREATE INDEX IF NOT EXISTS idx_categories_deleted_at ON categories (deleted_at);
    `);
  },
};
