import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'mizan.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Lazily-opened SQLite singleton. All DB access goes through repositories/service which
 * call this — never open the database directly elsewhere.
 */
export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);
  await dbInstance.execAsync('PRAGMA journal_mode = WAL;');
  await dbInstance.execAsync('PRAGMA foreign_keys = ON;');
  return dbInstance;
}

/** For tests/teardown only. */
export async function closeDatabase(): Promise<void> {
  await dbInstance?.closeAsync();
  dbInstance = null;
}
