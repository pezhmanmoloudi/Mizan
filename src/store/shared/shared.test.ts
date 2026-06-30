import { memoizeOne, normalizeError, type RequestState, runRequest } from '.';

describe('store/shared', () => {
  describe('normalizeError', () => {
    it('extracts message from Error, passes strings, falls back otherwise', () => {
      expect(normalizeError(new Error('boom'))).toBe('boom');
      expect(normalizeError('nope')).toBe('nope');
      expect(normalizeError({ weird: true })).toBe('Unexpected error');
    });
  });

  describe('runRequest', () => {
    it('drives pending → success and returns the value', async () => {
      const states: RequestState[] = [];
      const result = await runRequest(
        (s) => states.push(s),
        async () => 42,
      );
      expect(result).toBe(42);
      expect(states.map((s) => s.status)).toEqual(['pending', 'success']);
    });

    it('drives pending → error, normalizes the message, and returns null', async () => {
      const states: RequestState[] = [];
      const result = await runRequest(
        (s) => states.push(s),
        async () => {
          throw new Error('db down');
        },
      );
      expect(result).toBeNull();
      expect(states.map((s) => s.status)).toEqual(['pending', 'error']);
      expect(states[1]?.error).toBe('db down');
    });
  });

  describe('memoizeOne', () => {
    it('returns a stable reference for the same input and recomputes on change', () => {
      const spy = jest.fn((arr: number[]) => arr.map((n) => n * 2));
      const memo = memoizeOne(spy);
      const a = [1, 2];
      const first = memo(a);
      const second = memo(a);
      expect(first).toBe(second); // same ref
      expect(spy).toHaveBeenCalledTimes(1);

      const third = memo([3]);
      expect(third).not.toBe(first);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
