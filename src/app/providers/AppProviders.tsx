import type { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from './ErrorBoundary';
import { I18nProvider } from './I18nProvider';
import { ThemeProvider } from './ThemeProvider';

/**
 * Single composition point for all app-wide providers. Order matters:
 * ErrorBoundary (outermost, catches everything) → SafeArea → I18n → Theme.
 * Theme direction is resolved inside ThemeProvider from the persisted settings language.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <I18nProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
