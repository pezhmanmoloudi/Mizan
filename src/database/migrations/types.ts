import type { SQLiteDatabase } from 'expo-sqlite';

export type Migration = {
  /** Monotonic, 1-based version. Maps to SQLite's `user_version` pragma. */
  version: number;
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};
