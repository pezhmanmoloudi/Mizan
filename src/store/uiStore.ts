import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ColorScheme } from '@/theme';

import { persistStorage } from './storage';

export type ThemePreference = ColorScheme | 'system';

/**
 * Cross-cutting UI/preference state. This is the canonical reference store for the
 * conventions documented in CLAUDE.md:
 *  - state holds only serializable, sync-friendly values
 *  - actions are colocated and pure
 *  - selectors are exported as hooks so components never subscribe to the whole store
 *  - persistence is whitelisted via `partialize` and versioned for future migrations
 */
type UiState = {
  themePreference: ThemePreference;
  rtlOverride: boolean | null; // null = follow device/locale
  hasCompletedOnboarding: boolean;
};

type UiActions = {
  setThemePreference: (preference: ThemePreference) => void;
  toggleTheme: (resolvedScheme: ColorScheme) => void;
  setRtlOverride: (rtl: boolean | null) => void;
  completeOnboarding: () => void;
};

export type UiStore = UiState & UiActions;

const initialState: UiState = {
  themePreference: 'system',
  rtlOverride: null,
  hasCompletedOnboarding: false,
};

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      ...initialState,
      setThemePreference: (themePreference) => set({ themePreference }),
      toggleTheme: (resolvedScheme) =>
        set({ themePreference: resolvedScheme === 'dark' ? 'light' : 'dark' }),
      setRtlOverride: (rtlOverride) => set({ rtlOverride }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'mizan.ui',
      version: 1,
      storage: createJSONStorage(() => persistStorage),
      partialize: (state) => ({
        themePreference: state.themePreference,
        rtlOverride: state.rtlOverride,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
      // migrate: (persisted, fromVersion) => persisted as UiStore,
    },
  ),
);

// --- Selectors (preferred consumption path) -------------------------------------------
export const useThemePreference = () => useUiStore((s) => s.themePreference);
export const useRtlOverride = () => useUiStore((s) => s.rtlOverride);
export const useHasCompletedOnboarding = () => useUiStore((s) => s.hasCompletedOnboarding);
