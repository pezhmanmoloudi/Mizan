/**
 * Database-level enumerations. These are the stable string literals persisted in SQLite
 * (stored as TEXT) and surfaced on typed models. Keep them in sync with the schema in
 * `database/migrations` — a value added here usually needs no migration, but removing or
 * renaming one does.
 */

/** Whether a category/transaction represents money in or money out. */
export type EntryType = 'income' | 'expense';

export const ENTRY_TYPES: readonly EntryType[] = ['income', 'expense'];

/** How a transaction was paid. Extend by adding a literal here (no migration required). */
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'other';

export const PAYMENT_METHODS: readonly PaymentMethod[] = ['cash', 'card', 'transfer', 'other'];
