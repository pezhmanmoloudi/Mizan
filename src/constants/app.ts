/** App-wide static constants. */
export const APP_NAME = 'Mizan';

export const SUPPORTED_LOCALES = ['en', 'fa'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: readonly AppLocale[] = ['fa'];

export const DEFAULT_CURRENCY = 'USD';
