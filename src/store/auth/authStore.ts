import { create } from 'zustand';

import { type User, userRepository } from '@/database';

import { normalizeError } from '../shared';

/**
 * Authentication foundation — a stub, not a real auth system. Mizan is offline-first and
 * starts every session as a local guest user; a future auth flow will add an
 * `'authenticated'` path and a real `signIn`. Domain stores read `user.id` (the owner of
 * transactions) from here.
 *
 * Scope guard: NO real authentication, network, or token handling in this epic.
 */
export type AuthStatus = 'unknown' | 'guest' | 'authenticated';

type AuthState = {
  status: AuthStatus;
  user: User | null;
  error: string | null;
};

type AuthActions = {
  /** Ensure a local guest user exists and adopt it as the current session. */
  continueAsGuest: () => Promise<User | null>;
  /** Placeholder for the future authenticated flow. */
  signIn: () => Promise<never>;
  /** Drop the current session back to guest state. */
  signOut: () => void;
  reset: () => void;
};

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  status: 'unknown',
  user: null,
  error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  continueAsGuest: async () => {
    try {
      const existing = await userRepository.findGuest();
      const user = existing ?? (await userRepository.create({ name: 'Guest', isGuest: true }));
      set({ status: 'guest', user, error: null });
      return user;
    } catch (error) {
      set({ status: 'unknown', error: normalizeError(error) });
      return null;
    }
  },

  signIn: async () => {
    throw new Error('Authentication is not implemented yet.');
  },

  signOut: () => set({ status: 'guest', user: null, error: null }),

  reset: () => set(initialState),
}));

// --- Selectors -------------------------------------------------------------------------
export const useAuthStatus = () => useAuthStore((s) => s.status);
export const useCurrentUser = () => useAuthStore((s) => s.user);
export const useCurrentUserId = () => useAuthStore((s) => s.user?.id ?? null);
