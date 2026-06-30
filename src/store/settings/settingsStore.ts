import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type AppLocale, DEFAULT_CURRENCY } from '@/constants';
import { i18n, initI18n, resolveDeviceLocale } from '@/localization';
import type { ColorScheme } from '@/theme';

import { persistStorage } from '../storage';

export type ThemePreference = ColorScheme | 'system';

/**
 * Persisted user preferences. This is the home for everything the user can configure that
 * must survive relaunch: appearance, language, currency, RTL override, and onboarding/launch
 * flags. It supersedes the old `uiStore` and follows the same canonical conventions
 * (serializable state, `partialize` whitelist, exported selector hooks).
 *
 * Language integration: `language` drives both i18next (`i18n.changeLanguage`) and theme
 * direction (resolved in `ThemeProvider` via `isRtlLocale`). The initial `language` is the
 * device locale so first paint matches device behavior; a persisted override is re-applied
 * on rehydration (see `onRehydrateStorage`), which happens behind the bootstrap loading gate.
 */
type SettingsState = {
  themePreference: ThemePreference;
  rtlOverride: boolean | null; // null = follow the selected language's direction
  language: AppLocale;
  currency: string; // forward-looking: read by money formatting once that lands
  hasCompletedOnboarding: boolean;
  hasLaunchedBefore: boolean;
  /** Not persisted. True once async rehydration has finished applying persisted prefs. */
  _hasHydrated: boolean;
};

type SettingsActions = {
  setThemePreference: (preference: ThemePreference) => void;
  toggleTheme: (resolvedScheme: ColorScheme) => void;
  setRtlOverride: (rtl: boolean | null) => void;
  setLanguage: (language: AppLocale) => void;
  setCurrency: (currency: string) => void;
  completeOnboarding: () => void;
  markLaunched: () => void;
  reset: () => void;
};

export type SettingsStore = SettingsState & SettingsActions;

const initialState: SettingsState = {
  themePreference: 'system',
  rtlOverride: null,
  language: resolveDeviceLocale(),
  currency: DEFAULT_CURRENCY,
  hasCompletedOnboarding: false,
  hasLaunchedBefore: false,
  _hasHydrated: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,
      setThemePreference: (themePreference) => set({ themePreference }),
      toggleTheme: (resolvedScheme) =>
        set({ themePreference: resolvedScheme === 'dark' ? 'light' : 'dark' }),
      setRtlOverride: (rtlOverride) => set({ rtlOverride }),
      setLanguage: (language) => {
        set({ language });
        void i18n.changeLanguage(language);
      },
      setCurrency: (currency) => set({ currency }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      markLaunched: () => set({ hasLaunchedBefore: true }),
      reset: () => set(initialState),
    }),
    {
      name: 'mizan.settings',
      version: 1,
      storage: createJSONStorage(() => persistStorage),
      partialize: (state) => ({
        themePreference: state.themePreference,
        rtlOverride: state.rtlOverride,
        language: state.language,
        currency: state.currency,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasLaunchedBefore: state.hasLaunchedBefore,
      }),
      onRehydrateStorage: () => (state) => {
        // Runs after async rehydration. `initI18n()` is idempotent and guards against this
        // firing before I18nProvider mounts; only then is `changeLanguage` safe to call.
        if (state) {
          initI18n();
          void i18n.changeLanguage(state.language);
        }
        useSettingsStore.setState({ _hasHydrated: true });
      },
    },
  ),
);

/**
 * Resolves once persisted settings have finished hydrating. App bootstrap awaits this before
 * reading any preference, so language/theme are settled before the real UI renders.
 */
export function waitForSettingsHydration(): Promise<void> {
  if (useSettingsStore.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    const unsub = useSettingsStore.persist.onFinishHydration(() => {
      unsub?.();
      resolve();
    });
  });
}

// --- Selectors (preferred consumption path) -------------------------------------------
export const useThemePreference = () => useSettingsStore((s) => s.themePreference);
export const useRtlOverride = () => useSettingsStore((s) => s.rtlOverride);
export const useLanguage = () => useSettingsStore((s) => s.language);
export const useCurrency = () => useSettingsStore((s) => s.currency);
export const useHasCompletedOnboarding = () => useSettingsStore((s) => s.hasCompletedOnboarding);
