import { useEffect, useState } from 'react';

import { databaseService } from '@/database';
import { createLogger } from '@/utils';

const log = createLogger('app.bootstrap');

/**
 * One-time app initialization: opens the database and runs migrations. Returns a `ready`
 * flag so the root can hold rendering until offline storage is available.
 */
export function useBootstrap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await databaseService.init();
      } catch (e) {
        log.error('Bootstrap failed', e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready };
}
