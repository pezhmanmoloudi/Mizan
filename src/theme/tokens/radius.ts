/**
 * Border radius scale. UX guideline: cards and surfaces favour the 12-16px range (md/lg).
 */
export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export type Radius = typeof radius;
export type RadiusToken = keyof Radius;
