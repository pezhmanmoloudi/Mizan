import { useEffect } from 'react';

import { useAppReady, useAppStore } from '@/store';

/**
 * One-time app initialization. Delegates the startup sequence (DB init + migrations,
 * settings hydration, guest session, initial data load) to the `app` store's idempotent
 * `initialize()`, and exposes a `ready` flag so the root holds rendering until the offline
 * data layer is available.
 */
export function useBootstrap() {
  const ready = useAppReady();

  useEffect(() => {
    void useAppStore.getState().initialize();
  }, []);

  return { ready };
}
