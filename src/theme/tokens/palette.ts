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
  blue100: '#E6EDFF',

  // Status
  green500: '#2ED573',
  green100: '#E3F9ED',
  red500: '#FF4757',
  red100: '#FFE5E8',
  amber500: '#FFA502',
  amber100: '#FFF3DD',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F7F8FA',
  gray100: '#EFF1F5',
  gray200: '#E2E6ED',
  gray300: '#CBD2DD',
  gray400: '#9AA4B2',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F242B',
  gray900: '#0F1115',

  transparent: 'transparent',
} as const;

export type Palette = typeof palette;
