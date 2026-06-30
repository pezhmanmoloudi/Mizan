import { useRtlOverride, useSettingsStore, useThemePreference } from '@/store';

/**
 * Reads and writes the theme + direction preferences. Keeps preference logic out of the
 * screen (screens stay presentational) while delegating to the persisted `settings` store.
 */
export function useThemeSettings() {
  const themePreference = useThemePreference();
  const setThemePreference = useSettingsStore((s) => s.setThemePreference);
  const rtlOverride = useRtlOverride();
  const setRtlOverride = useSettingsStore((s) => s.setRtlOverride);

  return { themePreference, setThemePreference, rtlOverride, setRtlOverride };
}
