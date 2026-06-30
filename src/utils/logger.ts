type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

// In production only warnings and above are emitted; everything routes through one sink
// so a remote logger can be added later without touching call sites.
const MIN_LEVEL: LogLevel = __DEV__ ? 'debug' : 'warn';

function emit(level: LogLevel, scope: string, message: string, meta?: unknown): void {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[MIN_LEVEL]) return;
  const tag = `[${scope}]`;
  const args = meta === undefined ? [tag, message] : [tag, message, meta];

  console[level === 'debug' ? 'log' : level](...args);
}

/** Create a namespaced logger. Prefer `createLogger('feature.module')` over bare console. */
export function createLogger(scope: string) {
  return {
    debug: (message: string, meta?: unknown) => emit('debug', scope, message, meta),
    info: (message: string, meta?: unknown) => emit('info', scope, message, meta),
    warn: (message: string, meta?: unknown) => emit('warn', scope, message, meta),
    error: (message: string, meta?: unknown) => emit('error', scope, message, meta),
  };
}

export const logger = createLogger('app');
