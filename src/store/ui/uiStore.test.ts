import { useUiStore } from './uiStore';

describe('uiStore', () => {
  beforeEach(() => useUiStore.getState().reset());

  it('shows a notice with the default info tone', () => {
    useUiStore.getState().showNotice('Saved');
    expect(useUiStore.getState().notice).toEqual({ message: 'Saved', tone: 'info' });
  });

  it('shows an error notice and clears it', () => {
    useUiStore.getState().showNotice('Failed', 'error');
    expect(useUiStore.getState().notice?.tone).toBe('error');
    useUiStore.getState().clearNotice();
    expect(useUiStore.getState().notice).toBeNull();
  });
});
