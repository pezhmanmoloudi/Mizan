import { create } from 'zustand';

import { databaseService } from '@/database';
import { createLogger } from '@/utils';

import { useAuthStore } from '../auth';
import { useCategoriesStore } from '../categories';
import { useSettingsStore, waitForSettingsHydration } from '../settings';
import { normalizeError } from '../shared';
import { useTransactionsStore } from '../transactions';

const log = createLogger('store.app');

/**
 * Startup orchestration. This store owns the cross-cutting init sequence and the
 * app-ready/first-launch flags the root uses to gate rendering. It is the ONLY store that
 * depends on the others — the domain/settings/auth stores never import `app`, which keeps the
 * dependency graph acyclic. Orchestration reads/writes peers via `getState()`.
 */
type AppState = {
  status: 'idle' | 'pending' | 'ready' | 'error';
  isReady: boolean;
  isFirstLaunch: boolean;
  error: string | null;
};

type AppActions = {
  initialize: () => Promise<void>;
  reset: () => void;
};

export type AppStore = AppState & AppActions;

const initialState: AppState = {
  status: 'idle',
  isReady: false,
  isFirstLaunch: false,
  error: null,
};

// Cached in-flight promise so React StrictMode's double-invoke (or two callers) run the
// sequence exactly once.
let initPromise: Promise<void> | null = null;

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,

  initialize: async () => {
    if (initPromise) return initPromise;

    initPromise = (async () => {
      set({ status: 'pending', error: null });
      try {
        // 1. Local DB ready (opens connection, runs migrations, seeds defaults).
        await databaseService.init();
        // 2. Persisted preferences hydrated before anything reads them.
        await waitForSettingsHydration();
        // 3. Establish the local guest session, then load that user's data in parallel.
        const user = await useAuthStore.getState().continueAsGuest();
        await Promise.all([
          useCategoriesStore.getState().load(),
          user ? useTransactionsStore.getState().load(user.id) : Promise.resolve(),
        ]);
        // 4. First-launch detection, then mark launched for next time.
        const settings = useSettingsStore.getState();
        set({ isFirstLaunch: !settings.hasLaunchedBefore });
        settings.markLaunched();

        set({ status: 'ready', isReady: true });
        log.info('App initialized');
      } catch (error) {
        // Still unblock the UI on failure (matches existing bootstrap behavior).
        set({ status: 'error', error: normalizeError(error), isReady: true });
        log.error('App initialization failed', error);
      }
    })();

    return initPromise;
  },

  reset: () => {
    initPromise = null;
    set(initialState);
  },
}));

// --- Selectors -------------------------------------------------------------------------
export const useAppReady = () => useAppStore((s) => s.isReady);
export const useIsFirstLaunch = () => useAppStore((s) => s.isFirstLaunch);
export const useAppError = () => useAppStore((s) => s.error);
