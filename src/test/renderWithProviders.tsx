import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { buildTheme, type ColorScheme, ThemeContext } from '@/theme';

type ProvidersOptions = {
  scheme?: ColorScheme;
  rtl?: boolean;
};

/**
 * Wraps a component in the theme + safe-area providers used in the app, so component tests
 * exercise real token styling. i18n is initialized lazily by consumers that need it.
 *
 * Async because React Native Testing Library v14 renders via an async `act`.
 */
export function renderWithProviders(
  ui: ReactElement,
  { scheme = 'light', rtl = false, ...options }: ProvidersOptions & RenderOptions = {},
) {
  const theme = buildTheme(scheme, rtl ? 'rtl' : 'ltr');
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 320, height: 640 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SafeAreaProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react-native';
