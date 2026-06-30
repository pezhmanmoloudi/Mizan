import { useCallback, useEffect, useRef, useState } from 'react';

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export type AsyncState<T> = {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

/**
 * Reusable async-state pattern. Returns a uniform `{ status, data, error, isLoading }`
 * shape plus a stable `run`. Guards against setState after unmount. Screens and features
 * should use this instead of hand-rolling loading flags.
 */
export function useAsync<T>(asyncFn: () => Promise<T>, options: { immediate?: boolean } = {}) {
  const { immediate = false } = options;
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
  });

  const mounted = useRef(true);
  const fnRef = useRef(asyncFn);

  // Keep the latest fn without making `run` unstable (refs are written in effects only).
  useEffect(() => {
    fnRef.current = asyncFn;
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(async (): Promise<T | null> => {
    setState((s) => ({ ...s, status: 'pending', isLoading: true, error: null }));
    try {
      const data = await fnRef.current();
      if (mounted.current) {
        setState({ status: 'success', data, error: null, isLoading: false });
      }
      return data;
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      if (mounted.current) {
        setState({ status: 'error', data: null, error, isLoading: false });
      }
      return null;
    }
  }, []);

  useEffect(() => {
    // Mount-time fetch: synchronizing with an external system (repository/service) is a
    // valid effect use, so the setState-in-effect heuristic is intentionally suppressed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (immediate) void run();
  }, [immediate, run]);

  return { ...state, run } as const;
}
