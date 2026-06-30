import type { ID, ISODateString, WithSyncMeta } from '@/types';

import type { EntryType, PaymentMethod } from '../types';

/** Domain model (camelCase) for a single money movement. */
export type Transaction = WithSyncMeta<{
  id: ID;
  userId: ID;
  categoryId: ID;
  /** Stored as a positive number; direction is carried by `type`. */
  amount: number;
  type: EntryType;
  note: string | null;
  /** Calendar date the money moved (ISO-8601). Distinct from `createdAt`. */
  date: ISODateString;
  paymentMethod: PaymentMethod;
}>;

/** Raw row shape as stored in SQLite (snake_case). */
export type TransactionRow = {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  type: string;
  note: string | null;
  date: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  sync_status: string;
};

/** Fields a caller supplies when creating a transaction; the rest are managed by the repo. */
export type NewTransaction = {
  id?: ID;
  userId: ID;
  categoryId: ID;
  amount: number;
  type: EntryType;
  note?: string | null;
  date: ISODateString;
  paymentMethod: PaymentMethod;
};
