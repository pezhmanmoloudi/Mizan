import { palette } from './palette';

/**
 * Semantic color contract. Both light and dark themes must implement this exact shape,
 * which keeps schemes structurally identical and lets components stay scheme-agnostic.
 */
export type ColorTokens = {
  primary: string;
  primaryHover: string;
  onPrimary: string;
  primaryMuted: string;

  success: string;
  successMuted: string;
  error: string;
  errorMuted: string;
  warning: string;
  warningMuted: string;

  background: string;
  surface: string;
  surfaceElevated: string;

  text: string;
  textMuted: string;
  textInverse: string;

  border: string;
  borderStrong: string;

  overlay: string;
  transparent: string;
};

export const lightColors: ColorTokens = {
  primary: palette.blue500,
  primaryHover: palette.blue600,
  onPrimary: palette.white,
  primaryMuted: palette.blue100,

  success: palette.green500,
  successMuted: palette.green100,
  error: palette.red500,
  errorMuted: palette.red100,
  warning: palette.amber500,
  warningMuted: palette.amber100,

  background: palette.gray50,
  surface: palette.white,
  surfaceElevated: palette.white,

  text: palette.gray900,
  textMuted: palette.gray500,
  textInverse: palette.white,

  border: palette.gray200,
  borderStrong: palette.gray300,

  overlay: 'rgba(15, 17, 21, 0.45)',
  transparent: palette.transparent,
};

export const darkColors: ColorTokens = {
  primary: palette.blue500,
  primaryHover: palette.blue600,
  onPrimary: palette.white,
  primaryMuted: 'rgba(79, 124, 255, 0.16)',

  success: palette.green500,
  successMuted: 'rgba(46, 213, 115, 0.16)',
  error: palette.red500,
  errorMuted: 'rgba(255, 71, 87, 0.16)',
  warning: palette.amber500,
  warningMuted: 'rgba(255, 165, 2, 0.16)',

  background: palette.gray900,
  surface: palette.gray800,
  surfaceElevated: palette.gray700,

  text: palette.gray50,
  textMuted: palette.gray400,
  textInverse: palette.gray900,

  border: palette.gray700,
  borderStrong: palette.gray600,

  overlay: 'rgba(0, 0, 0, 0.6)',
  transparent: palette.transparent,
};
