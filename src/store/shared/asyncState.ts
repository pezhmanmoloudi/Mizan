/**
 * Reusable async-state conventions for the domain stores. Repository calls are fast local
 * SQLite writes, but loads can still fail (corrupt DB, migration error), so every
 * repository-backed store carries a small request-state slice handled through `runRequest`.
 *
 * The status vocabulary matches `useAsync` (`hooks/useAsync.ts`) so the app has a single
 * set of async literals. Errors are normalized to strings — stores hold only serializable,
 * sync-friendly values (CLAUDE.md), so an `Error` instance never lives in store state.
 */
export type RequestStatus = 'idle' | 'pending' | 'success' | 'error';

export type RequestState = {
  status: RequestStatus;
  error: string | null;
};

export const initialRequestState: RequestState = { status: 'idle', error: null };

/** Collapse any thrown value into a stable, serializable message. */
export function normalizeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unexpected error';
}

/**
 * Runs an async unit of work, driving the `{ status, error }` slice through
 * pending → success | error. Returns the work's value, or `null` on failure so callers can
 * branch without try/catch. The `set` is intentionally narrow (only the request slice) so
 * it composes with any store's `set`.
 */
export async function runRequest<T>(
  set: (partial: RequestState) => void,
  work: () => Promise<T>,
): Promise<T | null> {
  set({ status: 'pending', error: null });
  try {
    const result = await work();
    set({ status: 'success', error: null });
    return result;
  } catch (error) {
    set({ status: 'error', error: normalizeError(error) });
    return null;
  }
}
