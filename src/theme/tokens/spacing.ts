/**
 * Spacing scale on a 4pt base. Use these tokens for all padding, margin and gap.
 * No raw pixel spacing in components.
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export type Spacing = typeof spacing;
export type SpacingToken = keyof Spacing;
