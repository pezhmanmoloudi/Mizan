import { useRtlOverride, useThemePreference, useUiStore } from '@/store';

/**
 * Reads and writes the theme + direction preferences. Keeps preference logic out of the
 * screen (screens stay presentational) while delegating to the canonical `uiStore`.
 */
export function useThemeSettings() {
  const themePreference = useThemePreference();
  const setThemePreference = useUiStore((s) => s.setThemePreference);
  const rtlOverride = useRtlOverride();
  const setRtlOverride = useUiStore((s) => s.setRtlOverride);

  return { themePreference, setThemePreference, rtlOverride, setRtlOverride };
}
