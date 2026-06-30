/**
 * Single-entry memoization keyed on the input's reference identity. Used by store selectors
 * that derive a NEW collection (grouping, filtering, totals) from a source array: as long as
 * the store swaps the source array reference only when its contents actually change, the
 * derived value keeps a stable reference across renders. That stability is what prevents
 * extra re-renders and avoids Zustand v5's "selector returned a new snapshot" warning.
 *
 * Only suitable for unparameterized derivations (one argument). For parameterized selectors
 * (e.g. `recent(n)`), slice at the call site and wrap the hook with `useShallow` instead —
 * a single-entry cache would thrash when two consumers pass different arguments.
 */
export function memoizeOne<I, O>(fn: (input: I) => O): (input: I) => O {
  let lastInput: I;
  let lastOutput: O;
  let hasRun = false;
  return (input: I): O => {
    if (hasRun && Object.is(input, lastInput)) return lastOutput;
    lastOutput = fn(input);
    lastInput = input;
    hasRun = true;
    return lastOutput;
  };
}
