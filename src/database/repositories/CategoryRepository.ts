import type { Category, CategoryRow } from '../models';
import { BaseRepository } from './BaseRepository';

/**
 * Reference repository demonstrating the row<->model mapping, soft-delete and sync-status
 * conventions. Business rules do NOT belong here — only persistence.
 */
export class CategoryRepository extends BaseRepository {
  protected readonly table = 'categories';

  private toModel(row: CategoryRow): Category {
    return {
      id: row.id,
      name: row.name,
      color: row.color,
      icon: row.icon,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      syncStatus: row.sync_status as Category['syncStatus'],
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

  async create(input: Pick<Category, 'id' | 'name' | 'color' | 'icon'>): Promise<Category> {
    const db = await this.db();
    const now = this.nowIso();
    await db.runAsync(
      `INSERT INTO ${this.table}
        (id, name, color, icon, created_at, updated_at, deleted_at, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, NULL, 'local');`,
      [input.id, input.name, input.color, input.icon, now, now],
    );
    return {
      ...input,
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
