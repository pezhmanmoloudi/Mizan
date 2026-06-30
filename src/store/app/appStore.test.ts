import AsyncStorage from '@react-native-async-storage/async-storage';

import type { User } from '@/database';
import { databaseService, transactionRepository } from '@/database';

import { useAuthStore } from '../auth';
import { useCategoriesStore } from '../categories';
import { useSettingsStore } from '../settings';
import { useTransactionsStore } from '../transactions';
import { useAppStore } from './appStore';

const guest: User = {
  id: 'u1',
  name: 'Guest',
  email: null,
  isGuest: true,
  createdAt: '2026-06-01T00:00:00.000Z',
  updatedAt: '2026-06-01T00:00:00.000Z',
  deletedAt: null,
  syncStatus: 'local',
};

jest.mock('@/database', () => ({
  databaseService: { init: jest.fn().mockResolvedValue(undefined) },
  userRepository: {
    findGuest: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue(guest),
  },
  categoryRepository: { findAll: jest.fn().mockResolvedValue([]) },
  transactionRepository: { findByUser: jest.fn().mockResolvedValue([]) },
}));

jest.mock('@/localization', () => ({
  i18n: { changeLanguage: jest.fn() },
  initI18n: jest.fn(),
  resolveDeviceLocale: jest.fn(() => 'en'),
  isRtlLocale: (l: string) => l === 'fa',
}));

const init = databaseService.init as jest.Mock;
const findByUser = transactionRepository.findByUser as jest.Mock;

describe('appStore.initialize', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    useAppStore.getState().reset();
    useAuthStore.getState().reset();
    useCategoriesStore.getState().reset();
    useTransactionsStore.getState().reset();
    useSettingsStore.getState().reset();
    init.mockClear();
    findByUser.mockClear();
  });

  it('runs the full startup sequence and marks the app ready', async () => {
    await useAppStore.getState().initialize();

    expect(init).toHaveBeenCalled();
    expect(useAuthStore.getState().user).toEqual(guest);
    expect(findByUser).toHaveBeenCalledWith('u1'); // transactions loaded for the guest
    expect(useAppStore.getState().isReady).toBe(true);
    expect(useAppStore.getState().status).toBe('ready');
    expect(useAppStore.getState().isFirstLaunch).toBe(true); // hasLaunchedBefore was false
  });

  it('is idempotent — concurrent/repeat calls initialize once', async () => {
    await Promise.all([useAppStore.getState().initialize(), useAppStore.getState().initialize()]);
    await useAppStore.getState().initialize();
    expect(init).toHaveBeenCalledTimes(1);
  });

  it('still unblocks (isReady) and records the error when a step fails', async () => {
    init.mockRejectedValueOnce(new Error('db corrupt'));
    await useAppStore.getState().initialize();
    expect(useAppStore.getState().status).toBe('error');
    expect(useAppStore.getState().error).toBe('db corrupt');
    expect(useAppStore.getState().isReady).toBe(true);
  });
});
