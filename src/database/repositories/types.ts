import type {
  Category,
  CategoryPatch,
  NewCategory,
  NewTransaction,
  NewUser,
  Transaction,
  TransactionPatch,
  User,
} from '../models';

/**
 * Read/write contracts for the repository layer. Screens and feature hooks depend on these
 * interfaces, not concrete classes, so the persistence implementation can evolve (or be
 * swapped for a synced backend) behind a stable, typed surface.
 *
 * These cover the foundational CRUD + soft-delete shape only. Business/analytics queries
 * are intentionally out of scope for the foundation and will extend these per feature.
 */
export interface ReadRepository<TModel> {
  findAll(): Promise<TModel[]>;
  findById(id: string): Promise<TModel | null>;
}

export interface WriteRepository<TModel, TNew> {
  create(input: TNew): Promise<TModel>;
  /** Soft delete (tombstone) — keeps the row for sync reconciliation. */
  softDelete(id: string): Promise<void>;
}

export interface ICategoriesRepository
  extends ReadRepository<Category>, WriteRepository<Category, NewCategory> {
  /** Partial update of an existing category. Returns the updated model, or null if missing. */
  update(id: string, patch: CategoryPatch): Promise<Category | null>;
}

export interface IUsersRepository extends ReadRepository<User>, WriteRepository<User, NewUser> {
  /** The local guest user, if one exists. Foundation for the future auth flow. */
  findGuest(): Promise<User | null>;
}

export interface ITransactionsRepository
  extends ReadRepository<Transaction>, WriteRepository<Transaction, NewTransaction> {
  findByUser(userId: string): Promise<Transaction[]>;
  /** Partial update of an existing transaction. Returns the updated model, or null if missing. */
  update(id: string, patch: TransactionPatch): Promise<Transaction | null>;
}
