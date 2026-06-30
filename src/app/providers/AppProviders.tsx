import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { isRtlLocale, resolveDeviceLocale } from '@/localization';

import { ErrorBoundary } from './ErrorBoundary';
import { I18nProvider } from './I18nProvider';
import { ThemeProvider } from './ThemeProvider';

/**
 * Single composition point for all app-wide providers. Order matters:
 * ErrorBoundary (outermost, catches everything) → SafeArea → I18n → Theme.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  const isLocaleRtl = isRtlLocale(resolveDeviceLocale());
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <I18nProvider>
          <ThemeProvider isLocaleRtl={isLocaleRtl}>{children}</ThemeProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
