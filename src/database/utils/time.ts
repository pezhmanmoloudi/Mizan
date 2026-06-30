import type { ISODateString } from '@/types';

/** Single source of "now" for the DB layer, so timestamps are consistent and mockable. */
export function nowIso(): ISODateString {
  return new Date().toISOString();
}
