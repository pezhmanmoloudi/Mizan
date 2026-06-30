import AsyncStorage from '@react-native-async-storage/async-storage';

import { i18n, initI18n } from '@/localization';

import { useSettingsStore } from './settingsStore';

jest.mock('@/localization', () => ({
  i18n: { changeLanguage: jest.fn() },
  initI18n: jest.fn(),
  resolveDeviceLocale: jest.fn(() => 'en'),
  isRtlLocale: (l: string) => l === 'fa',
}));

const changeLanguage = i18n.changeLanguage as jest.Mock;
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('settingsStore', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    useSettingsStore.getState().reset();
    changeLanguage.mockClear();
    (initI18n as jest.Mock).mockClear();
  });

  it('toggles and sets theme preference', () => {
    useSettingsStore.getState().toggleTheme('light');
    expect(useSettingsStore.getState().themePreference).toBe('dark');
    useSettingsStore.getState().setThemePreference('system');
    expect(useSettingsStore.getState().themePreference).toBe('system');
  });

  it('setLanguage updates state and drives i18next', () => {
    useSettingsStore.getState().setLanguage('fa');
    expect(useSettingsStore.getState().language).toBe('fa');
    expect(changeLanguage).toHaveBeenCalledWith('fa');
  });

  it('sets currency and onboarding/launch flags', () => {
    useSettingsStore.getState().setCurrency('EUR');
    useSettingsStore.getState().completeOnboarding();
    useSettingsStore.getState().markLaunched();
    expect(useSettingsStore.getState()).toMatchObject({
      currency: 'EUR',
      hasCompletedOnboarding: true,
      hasLaunchedBefore: true,
    });
  });

  it('persists only whitelisted keys (no _hasHydrated, no actions)', async () => {
    useSettingsStore.getState().setLanguage('fa');
    await flush();
    const raw = await AsyncStorage.getItem('mizan.settings');
    const persisted = JSON.parse(raw as string).state;
    expect(Object.keys(persisted).sort()).toEqual([
      'currency',
      'hasCompletedOnboarding',
      'hasLaunchedBefore',
      'language',
      'rtlOverride',
      'themePreference',
    ]);
    expect(persisted).not.toHaveProperty('_hasHydrated');
  });

  it('re-applies the persisted language on rehydration', async () => {
    await AsyncStorage.setItem(
      'mizan.settings',
      JSON.stringify({
        state: {
          themePreference: 'dark',
          rtlOverride: null,
          language: 'fa',
          currency: 'USD',
          hasCompletedOnboarding: false,
          hasLaunchedBefore: true,
        },
        version: 1,
      }),
    );

    await useSettingsStore.persist.rehydrate();

    expect(useSettingsStore.getState().language).toBe('fa');
    expect(useSettingsStore.getState()._hasHydrated).toBe(true);
    expect(initI18n).toHaveBeenCalled();
    expect(changeLanguage).toHaveBeenCalledWith('fa');
  });
});
