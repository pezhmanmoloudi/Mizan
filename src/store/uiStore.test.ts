import { useUiStore } from './uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    useUiStore.setState({
      themePreference: 'system',
      rtlOverride: null,
      hasCompletedOnboarding: false,
    });
  });

  it('toggles theme relative to the resolved scheme', () => {
    useUiStore.getState().toggleTheme('light');
    expect(useUiStore.getState().themePreference).toBe('dark');

    useUiStore.getState().toggleTheme('dark');
    expect(useUiStore.getState().themePreference).toBe('light');
  });

  it('sets an explicit theme preference', () => {
    useUiStore.getState().setThemePreference('dark');
    expect(useUiStore.getState().themePreference).toBe('dark');
  });

  it('records onboarding completion', () => {
    expect(useUiStore.getState().hasCompletedOnboarding).toBe(false);
    useUiStore.getState().completeOnboarding();
    expect(useUiStore.getState().hasCompletedOnboarding).toBe(true);
  });
});
