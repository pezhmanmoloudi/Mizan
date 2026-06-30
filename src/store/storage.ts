import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

/**
 * Single storage adapter for all persisted Zustand stores. Centralizing it here means a
 * future swap (e.g. MMKV or an encrypted store) touches one file, not every store.
 */
export const persistStorage: StateStorage = {
  getItem: (name) => AsyncStorage.getItem(name),
  setItem: (name, value) => AsyncStorage.setItem(name, value),
  removeItem: (name) => AsyncStorage.removeItem(name),
};
