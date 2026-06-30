/**
 * Typed access to public runtime config. Only `EXPO_PUBLIC_*` vars are bundled into the
 * client (Expo convention). Secrets must never be read here. Document new keys in
 * `.env.example`.
 */
export const env = {
  appEnv: (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as
    'development' | 'staging' | 'production',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? '',
  syncEnabled: process.env.EXPO_PUBLIC_SYNC_ENABLED === 'true',
} as const;

export const isProduction = env.appEnv === 'production';
