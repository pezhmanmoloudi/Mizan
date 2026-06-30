/**
 * Pure formatting helpers (no business logic). Locale-aware via Intl, which React Native
 * supports through Hermes. These are unit-test targets and have no UI dependencies.
 */
export function formatCurrency(amountMinor: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amountMinor / 100);
}

export function formatDate(date: Date | number, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}
