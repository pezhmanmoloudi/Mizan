import type { TextStyle } from 'react-native';

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
} as const;

/**
 * Named text variants. Components should reference a variant rather than composing
 * raw size/weight values, so type ramps stay consistent app-wide.
 */
export type TextVariant =
  'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'caption' | 'label';

export const textVariants: Record<TextVariant, TextStyle> = {
  display: { fontSize: fontSizes['3xl'], fontWeight: fontWeights.bold, lineHeight: 40 },
  title: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold, lineHeight: 34 },
  heading: { fontSize: fontSizes.xl, fontWeight: fontWeights.semibold, lineHeight: 28 },
  body: { fontSize: fontSizes.md, fontWeight: fontWeights.regular, lineHeight: 24 },
  bodyStrong: { fontSize: fontSizes.md, fontWeight: fontWeights.semibold, lineHeight: 24 },
  caption: { fontSize: fontSizes.sm, fontWeight: fontWeights.regular, lineHeight: 20 },
  label: { fontSize: fontSizes.xs, fontWeight: fontWeights.medium, lineHeight: 16 },
};

export const typography = {
  fontWeights,
  fontSizes,
  variants: textVariants,
} as const;

export type Typography = typeof typography;
