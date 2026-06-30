import type { SQLiteDatabase } from 'expo-sqlite';

import { boolToInt, nowIso } from '../utils';
import { DEFAULT_CATEGORIES } from './defaultCategories';

/**
 * Inserts the default categories. Runs once, invoked from the migration that introduces
 * them, so the SQLite `user_version` mechanism is the single source of "already seeded" —
 * no extra bookkeeping table and no risk of re-seeding rows a user later deleted.
 *
 * `INSERT OR IGNORE` keyed on the deterministic ids makes it safe to call more than once.
 * Accepts the active `db`/transaction handle so it participates in the migration's atomic
 * unit of work.
 */
export async function seedDefaultCategories(db: SQLiteDatabase): Promise<void> {
  const now = nowIso();
  for (const category of DEFAULT_CATEGORIES) {
    await db.runAsync(
      `INSERT OR IGNORE INTO categories
        (id, name, color, icon, type, is_default, created_at, updated_at, deleted_at, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, 'local');`,
      [
        category.id,
        category.nameKey,
        category.color,
        category.icon,
        category.type,
        boolToInt(true),
        now,
        now,
      ],
    );
  }
}
