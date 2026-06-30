import type { ViewStyle } from 'react-native';

/**
 * Elevation presets combining iOS shadow props with Android elevation so a single
 * token yields consistent depth across platforms.
 */
export type ShadowToken = 'none' | 'sm' | 'md' | 'lg';

export const shadows: Record<ShadowToken, ViewStyle> = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  lg: {
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
};

export type Shadows = typeof shadows;
