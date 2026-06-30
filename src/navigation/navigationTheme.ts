import { DarkTheme, DefaultTheme, type Theme as NavTheme } from '@react-navigation/native';

import type { Theme } from '@/theme';

/** Maps the design-system theme onto React Navigation's theme contract. */
export function toNavigationTheme(theme: Theme): NavTheme {
  const base = theme.scheme === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.error,
    },
  };
}
