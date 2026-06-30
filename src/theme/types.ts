import type {
  Animation,
  ColorTokens,
  Radius,
  Shadows,
  Spacing,
  Typography,
  ZIndex,
} from './tokens';

export type ColorScheme = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';

/**
 * The complete theme contract consumed via `useTheme()`. Only `colors` differ between
 * schemes; the rest are shared tokens. `isRTL`/`direction` let components adapt layout
 * without reading platform globals directly.
 */
export type Theme = {
  scheme: ColorScheme;
  direction: Direction;
  isRTL: boolean;
  colors: ColorTokens;
  spacing: Spacing;
  typography: Typography;
  radius: Radius;
  shadows: Shadows;
  animation: Animation;
  zIndex: ZIndex;
};
