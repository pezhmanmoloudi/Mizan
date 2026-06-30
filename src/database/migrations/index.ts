import type { SQLiteDatabase } from 'expo-sqlite';

import { createLogger } from '@/utils';

import { migration0001 } from './0001_init';
import { migration0002 } from './0002_users_transactions';
import type { Migration } from './types';

const log = createLogger('database.migrations');

// Ordered list of migrations. Append new migrations here; never edit a shipped one.
export const MIGRATIONS: Migration[] = [migration0001, migration0002];

/**
 * Idempotent migration runner using SQLite's `user_version` pragma. Applies every
 * migration whose version is greater than the stored version, in order, inside a
 * transaction per migration.
 */
export async function runMigrations(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version;');
  const current = row?.user_version ?? 0;

  const pending = MIGRATIONS.filter((m) => m.version > current).sort(
    (a, b) => a.version - b.version,
  );

  for (const migration of pending) {
    log.info(`Applying migration ${migration.version} (${migration.name})`);
    await db.withTransactionAsync(async () => {
      await migration.up(db);
    });
    await db.execAsync(`PRAGMA user_version = ${migration.version};`);
  }
}

export type { Migration } from './types';
