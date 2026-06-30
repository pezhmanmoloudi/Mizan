import { type ReactNode, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { isRtlLocale } from '@/localization';
import { useLanguage, useRtlOverride, useSettingsStore, useThemePreference } from '@/store';
import { buildTheme, type ColorScheme, ThemeContext } from '@/theme';

/**
 * Resolves the active theme from user preference + device scheme + selected-language
 * direction and provides it to the tree. Direction follows the persisted `language` (via
 * `isRtlLocale`) unless the user set an explicit `rtlOverride`. The resolved theme is
 * memoized so token objects stay stable.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const preference = useThemePreference();
  const rtlOverride = useRtlOverride();
  const language = useLanguage();
  const deviceScheme = useColorScheme();

  const scheme: ColorScheme =
    preference === 'system' ? (deviceScheme === 'dark' ? 'dark' : 'light') : preference;

  const isRTL = rtlOverride ?? isRtlLocale(language);

  const theme = useMemo(() => buildTheme(scheme, isRTL ? 'rtl' : 'ltr'), [scheme, isRTL]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Imperative theme controls for settings screens. */
export function useThemeController() {
  const setThemePreference = useSettingsStore((s) => s.setThemePreference);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const setRtlOverride = useSettingsStore((s) => s.setRtlOverride);
  return { setThemePreference, toggleTheme, setRtlOverride };
}
