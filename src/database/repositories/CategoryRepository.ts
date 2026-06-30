import type { Category, CategoryRow, NewCategory } from '../models';
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
