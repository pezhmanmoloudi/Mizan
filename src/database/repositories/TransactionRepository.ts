import type { NewTransaction, Transaction, TransactionRow } from '../models';
import type { EntryType, PaymentMethod } from '../types';
import { generateId, mapSyncMeta } from '../utils';
import { BaseRepository } from './BaseRepository';
import type { ITransactionsRepository } from './types';

/**
 * Persistence for transactions. Foundation-level CRUD + soft-delete only; aggregation and
 * analytics queries are deferred to feature work and will extend this class.
 */
export class TransactionRepository extends BaseRepository implements ITransactionsRepository {
  protected readonly table = 'transactions';

  private toModel(row: TransactionRow): Transaction {
    return {
      id: row.id,
      userId: row.user_id,
      categoryId: row.category_id,
      amount: row.amount,
      type: row.type as EntryType,
      note: row.note,
      date: row.date,
      paymentMethod: row.payment_method as PaymentMethod,
      ...mapSyncMeta(row),
    };
  }

  async findAll(): Promise<Transaction[]> {
    const db = await this.db();
    const rows = await db.getAllAsync<TransactionRow>(
      `SELECT * FROM ${this.table} WHERE deleted_at IS NULL ORDER BY date DESC;`,
    );
    return rows.map((r) => this.toModel(r));
  }

  async findById(id: string): Promise<Transaction | null> {
    const db = await this.db();
    const row = await db.getFirstAsync<TransactionRow>(
      `SELECT * FROM ${this.table} WHERE id = ? AND deleted_at IS NULL;`,
      [id],
    );
    return row ? this.toModel(row) : null;
  }

  async findByUser(userId: string): Promise<Transaction[]> {
    const db = await this.db();
    const rows = await db.getAllAsync<TransactionRow>(
      `SELECT * FROM ${this.table} WHERE user_id = ? AND deleted_at IS NULL ORDER BY date DESC;`,
      [userId],
    );
    return rows.map((r) => this.toModel(r));
  }

  async create(input: NewTransaction): Promise<Transaction> {
    const db = await this.db();
    const now = this.nowIso();
    const id = input.id ?? generateId();
    const note = input.note ?? null;
    await db.runAsync(
      `INSERT INTO ${this.table}
        (id, user_id, category_id, amount, type, note, date, payment_method,
         created_at, updated_at, deleted_at, sync_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 'local');`,
      [
        id,
        input.userId,
        input.categoryId,
        input.amount,
        input.type,
        note,
        input.date,
        input.paymentMethod,
        now,
        now,
      ],
    );
    return {
      id,
      userId: input.userId,
      categoryId: input.categoryId,
      amount: input.amount,
      type: input.type,
      note,
      date: input.date,
      paymentMethod: input.paymentMethod,
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

export const transactionRepository = new TransactionRepository();
