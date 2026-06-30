/**
 * Centralized stacking order. Reference these names instead of raw zIndex numbers so
 * layering conflicts are resolved in one place.
 */
export const zIndex = {
  base: 0,
  content: 1,
  fab: 10,
  dropdown: 20,
  header: 30,
  overlay: 40,
  modal: 50,
  toast: 60,
} as const;

export type ZIndex = typeof zIndex;
export type ZIndexToken = keyof ZIndex;
