import type { Category, CategoryPatch, CategoryRow, NewCategory } from '../models';
import type { EntryType } from '../types';
import { boolToInt, generateId, intToBool, mapSyncMeta } from '../utils';
import { BaseRepository } from './BaseRepository';
import type { ICategoriesRepository } from './types';

/**
 * Reference repository demonstrating the row<->model mapping, soft-delete and sync-status
 * conventions. Business rules do NOT belong here — only persistence.
 */
export class CategoryRepository extends BaseRepository implements ICategoriesRepository {
  protected readonly table = 'categories';

  private toModel(row: CategoryRow): Category {
    return {
      id: row.id,
      name: row.name,
      color: row.color,
      icon: row.icon,
      type: row.type as EntryType,
      isDefault: intToBool(row.is_default),
      ...mapSyncMeta(row),
    };
  }

  async findAll(): Promise<Category[]> {
    const db = await this.db();
    const rows = await db.getAllAsync<CategoryRow>(
      `SELECT * FROM ${this.table} WHERE deleted_at IS NULL ORDER BY name ASC;`,
    );
    return rows.map((r) => this.toModel(r));
  }

  async findById(id: string): Promise<Category | null> {
    const db = await this.db();
    const row = await db.getFirstAsync<CategoryRow>(
      `SELECT * FROM ${this.table} WHERE id = ? AND deleted_at IS NULL;`,
      [id],
    );
    return row ? this.toModel(row) : null;
  }

  async create(input: NewCategory): Promise<Category> {
    const db = await this.db();
    const now = this.nowIso();
    const id = input.id ?? generateId();
    const icon = input.icon ?? null;
    const isDefault = input.isDefault ?? false;
    await db.runAsync(
      `INSERT INTO ${this.table}
        (id, name, color, icon, type, is_default, created_at, updated_at, deleted_at, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, 'local');`,
      [id, input.name, input.color, icon, input.type, boolToInt(isDefault), now, now],
    );
    return {
      id,
      name: input.name,
      color: input.color,
      icon,
      type: input.type,
      isDefault,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      syncStatus: 'local',
    };
  }

  /**
   * Partial update. Columns are whitelisted (never interpolated from the patch keys) and
   * `updated_at`/`sync_status` are bumped so a future sync picks the change up.
   */
  async update(id: string, patch: CategoryPatch): Promise<Category | null> {
    const db = await this.db();
    const now = this.nowIso();
    const columns: string[] = [];
    const values: (string | number | null)[] = [];
    if (patch.name !== undefined) {
      columns.push('name = ?');
      values.push(patch.name);
    }
    if (patch.color !== undefined) {
      columns.push('color = ?');
      values.push(patch.color);
    }
    if (patch.icon !== undefined) {
      columns.push('icon = ?');
      values.push(patch.icon ?? null);
    }
    if (patch.type !== undefined) {
      columns.push('type = ?');
      values.push(patch.type);
    }
    if (patch.isDefault !== undefined) {
      columns.push('is_default = ?');
      values.push(boolToInt(patch.isDefault));
    }
    columns.push('updated_at = ?');
    values.push(now);
    columns.push("sync_status = 'pending'");
    await db.runAsync(`UPDATE ${this.table} SET ${columns.join(', ')} WHERE id = ?;`, [
      ...values,
      id,
    ]);
    return this.findById(id);
  }

  /** Soft delete (tombstone) — keeps the row for sync reconciliation. */
  async softDelete(id: string): Promise<void> {
    const db = await this.db();
    const now = this.nowIso();
    await db.runAsync(
      `UPDATE ${this.table} SET deleted_at = ?, updated_at = ?, sync_status = 'pending'
       WHERE id = ?;`,
      [now, now, id],
    );
  }
}

export const categoryRepository = new CategoryRepository();
