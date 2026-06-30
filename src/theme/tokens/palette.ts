/**
 * Raw color palette. These are the only literal hex values allowed in the codebase.
 * Components must never reference this file directly — consume semantic colors via
 * `useTheme().colors` instead. This layer exists so semantic tokens can be remapped
 * without touching component code.
 */
export const palette = {
  // Brand
  blue500: '#4F7CFF',
  blue600: '#3D63E0',
  blue100: '#E9EFFF',
  blueSoftDark: '#1C2540', // deep primary tint for dark-mode icon tiles/pills

  // Status (light soft tints + dark soft tints)
  green500: '#2ED573',
  green100: '#E5FAEE',
  greenSoftDark: '#10301F',
  red500: '#FF4757',
  red100: '#FFEAEC',
  redSoftDark: '#34151A',
  amber500: '#FFA502',
  amber100: '#FFF4E2',
  amberSoftDark: '#332408',

  // Neutrals — the dark ramp (650–900) matches the mockup's tight, near-black surfaces.
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F7F8FA',
  gray100: '#EFF1F5',
  gray200: '#ECEEF2',
  gray300: '#CBD2DD',
  gray400: '#8B92A5',
  gray500: '#6B7280',
  gray600: '#3A4150',
  gray650: '#262B36',
  gray700: '#1D212B',
  gray800: '#171A21',
  gray850: '#15171C',
  gray900: '#0F1115',

  transparent: 'transparent',
} as const;

export type Palette = typeof palette;
