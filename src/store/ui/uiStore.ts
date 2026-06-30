import { create } from 'zustand';

/**
 * Ephemeral, cross-cutting UI state — the counterpart to the persisted `settings` store.
 * Nothing here is written to storage; it resets on relaunch by design.
 *
 * Today it owns a single global "notice" slice (the seam for a future toast/snackbar), kept
 * intentionally minimal. New transient cross-feature UI flags (a global overlay, an active
 * sheet) belong here rather than in any persisted or domain store.
 */
export type NoticeTone = 'info' | 'error';

export type Notice = {
  message: string;
  tone: NoticeTone;
};

type UiState = {
  notice: Notice | null;
};

type UiActions = {
  showNotice: (message: string, tone?: NoticeTone) => void;
  clearNotice: () => void;
  reset: () => void;
};

export type UiStore = UiState & UiActions;

const initialState: UiState = {
  notice: null,
};

export const useUiStore = create<UiStore>((set) => ({
  ...initialState,
  showNotice: (message, tone = 'info') => set({ notice: { message, tone } }),
  clearNotice: () => set({ notice: null }),
  reset: () => set(initialState),
}));

// --- Selectors -------------------------------------------------------------------------
export const useNotice = () => useUiStore((s) => s.notice);
