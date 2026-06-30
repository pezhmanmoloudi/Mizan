import type { NewUser, User, UserRow } from '../models';
import { boolToInt, generateId, intToBool, mapSyncMeta } from '../utils';
import { BaseRepository } from './BaseRepository';
import type { IUsersRepository } from './types';

/** Persistence for app users. Auth/business logic lives elsewhere — this only stores rows. */
export class UserRepository extends BaseRepository implements IUsersRepository {
  protected readonly table = 'users';

  private toModel(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      isGuest: intToBool(row.is_guest),
      ...mapSyncMeta(row),
    };
  }

  async findAll(): Promise<User[]> {
    const db = await this.db();
    const rows = await db.getAllAsync<UserRow>(
      `SELECT * FROM ${this.table} WHERE deleted_at IS NULL ORDER BY created_at ASC;`,
    );
    return rows.map((r) => this.toModel(r));
  }

  async findById(id: string): Promise<User | null> {
    const db = await this.db();
    const row = await db.getFirstAsync<UserRow>(
      `SELECT * FROM ${this.table} WHERE id = ? AND deleted_at IS NULL;`,
      [id],
    );
    return row ? this.toModel(row) : null;
  }

  async findGuest(): Promise<User | null> {
    const db = await this.db();
    const row = await db.getFirstAsync<UserRow>(
      `SELECT * FROM ${this.table} WHERE is_guest = 1 AND deleted_at IS NULL LIMIT 1;`,
    );
    return row ? this.toModel(row) : null;
  }

  async create(input: NewUser): Promise<User> {
    const db = await this.db();
    const now = this.nowIso();
    const id = input.id ?? generateId();
    const email = input.email ?? null;
    const isGuest = input.isGuest ?? true;
    await db.runAsync(
      `INSERT INTO ${this.table}
        (id, name, email, is_guest, created_at, updated_at, deleted_at, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, NULL, 'local');`,
      [id, input.name, email, boolToInt(isGuest), now, now],
    );
    return {
      id,
      name: input.name,
      email,
      isGuest,
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

export const userRepository = new UserRepository();
