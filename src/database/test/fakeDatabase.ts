import type { SQLiteDatabase } from 'expo-sqlite';

/**
 * Minimal fake of the expo-sqlite async API for unit tests. Native SQLite can't run under
 * Jest, so repository tests inject this to assert the SQL/params they emit and the
 * row->model mapping they apply, without a real engine. Queue return values per method.
 */
export type FakeDatabase = {
  db: SQLiteDatabase;
  getAllAsync: jest.Mock;
  getFirstAsync: jest.Mock;
  runAsync: jest.Mock;
};

export function createFakeDatabase(): FakeDatabase {
  const getAllAsync = jest.fn().mockResolvedValue([]);
  const getFirstAsync = jest.fn().mockResolvedValue(null);
  const runAsync = jest.fn().mockResolvedValue({ changes: 1, lastInsertRowId: 0 });

  const db = { getAllAsync, getFirstAsync, runAsync } as unknown as SQLiteDatabase;
  return { db, getAllAsync, getFirstAsync, runAsync };
}
