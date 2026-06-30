/**
 * Motion tokens. Durations are in milliseconds. Easings are expressed as cubic-bezier
 * control points `[x1, y1, x2, y2]` — plain data, so the design system stays decoupled
 * from any animation library. Consumers (e.g. reanimated) map these to their own Easing,
 * for example: `Easing.bezier(...easings.standard)`.
 */
export const durations = {
  instant: 100,
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export type BezierCurve = readonly [number, number, number, number];

export const easings = {
  standard: [0.2, 0, 0, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
} as const satisfies Record<string, BezierCurve>;

export const animation = {
  durations,
  easings,
} as const;

export type Animation = typeof animation;
