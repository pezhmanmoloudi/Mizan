import { useContext } from 'react';

import { ThemeContext } from './ThemeContext';
import type { Theme } from './types';

/** Primary styling entry point. All components read design tokens through this hook. */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/**
 * Convenience factory for StyleSheet definitions that need theme tokens. Pass a builder
 * that receives the active theme; the styles re-derive when the theme changes.
 *
 * @example
 * const useStyles = makeStyles((t) => ({ box: { backgroundColor: t.colors.surface } }));
 */
export function makeStyles<T extends Record<string, unknown>>(builder: (theme: Theme) => T) {
  return function useStyles(): T {
    const theme = useTheme();
    return builder(theme);
  };
}
