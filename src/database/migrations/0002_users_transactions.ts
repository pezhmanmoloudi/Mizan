import type { SQLiteDatabase } from 'expo-sqlite';

import { seedDefaultCategories } from '../seeds';
import { SYNC_COLUMNS_SQL } from '../sync/syncColumns';
import type { Migration } from './types';

/**
 * Extends `categories` with `type`/`is_default`, introduces the `users` and
 * `transactions` tables, and seeds the default categories. Foreign keys reference the
 * sync-ready tables; indexes cover the access paths feature work will use (per user, per
 * category, by date) plus the soft-delete and sync-status filters every list query needs.
 */
export const migration0002: Migration = {
  version: 2,
  name: 'users_transactions',
  up: async (db: SQLiteDatabase) => {
    await db.execAsync(`
      ALTER TABLE categories ADD COLUMN type TEXT NOT NULL DEFAULT 'expense';
      ALTER TABLE categories ADD COLUMN is_default INTEGER NOT NULL DEFAULT 0;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT,
        is_guest INTEGER NOT NULL DEFAULT 1,
        ${SYNC_COLUMNS_SQL}
      );
      CREATE INDEX IF NOT EXISTS idx_users_deleted_at ON users (deleted_at);

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        category_id TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        note TEXT,
        date TEXT NOT NULL,
        payment_method TEXT NOT NULL DEFAULT 'cash',
        ${SYNC_COLUMNS_SQL},
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
      CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions (user_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions (category_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions (date);
      CREATE INDEX IF NOT EXISTS idx_transactions_deleted_at ON transactions (deleted_at);
      CREATE INDEX IF NOT EXISTS idx_transactions_sync_status ON transactions (sync_status);
    `);

    await seedDefaultCategories(db);
  },
};
