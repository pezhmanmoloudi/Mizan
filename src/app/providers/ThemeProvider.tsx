import { type ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { useRtlOverride, useThemePreference, useUiStore } from '@/store';
import { buildTheme, type ColorScheme, ThemeContext } from '@/theme';

/**
 * Resolves the active theme from user preference + device scheme + locale direction and
 * provides it to the tree. The resolved theme is memoized so token objects stay stable.
 */
export function ThemeProvider({
  children,
  isLocaleRtl,
}: {
  children: ReactNode;
  isLocaleRtl: boolean;
}) {
  const preference = useThemePreference();
  const rtlOverride = useRtlOverride();
  const deviceScheme = useColorScheme();

  const scheme: ColorScheme =
    preference === 'system' ? (deviceScheme === 'dark' ? 'dark' : 'light') : preference;

  const isRTL = rtlOverride ?? isLocaleRtl;

  const theme = useMemo(() => buildTheme(scheme, isRTL ? 'rtl' : 'ltr'), [scheme, isRTL]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Imperative theme controls for settings screens. */
export function useThemeController() {
  const setThemePreference = useUiStore((s) => s.setThemePreference);
  const toggleTheme = useUiStore((s) => s.toggleTheme);
  const setRtlOverride = useUiStore((s) => s.setRtlOverride);
  return { setThemePreference, toggleTheme, setRtlOverride };
}
