import {
  animation,
  darkColors,
  lightColors,
  radius,
  shadows,
  spacing,
  typography,
  zIndex,
} from './tokens';
import type { ColorScheme, Direction, Theme } from './types';

const sharedTokens = {
  spacing,
  typography,
  radius,
  shadows,
  animation,
  zIndex,
} as const;

/**
 * Builds a concrete theme for a scheme + direction. Adding a new theme later is a matter
 * of registering another entry in `themes` — components never change.
 */
export function buildTheme(scheme: ColorScheme, direction: Direction): Theme {
  return {
    scheme,
    direction,
    isRTL: direction === 'rtl',
    colors: scheme === 'dark' ? darkColors : lightColors,
    ...sharedTokens,
  };
}

export const themes: Record<ColorScheme, (direction: Direction) => Theme> = {
  light: (direction) => buildTheme('light', direction),
  dark: (direction) => buildTheme('dark', direction),
};
