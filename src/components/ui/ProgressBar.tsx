import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

export type ProgressTone = 'primary' | 'success' | 'error' | 'warning';

export type ProgressBarProps = ViewProps & {
  /** 0–1; values outside the range are clamped. */
  progress: number;
  tone?: ProgressTone;
};

/** Slim budget/usage progress indicator. */
export function ProgressBar({ progress, tone = 'primary', style, ...rest }: ProgressBarProps) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));

  const fill: Record<ProgressTone, string> = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
  };

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 1, now: clamped }}
      style={[
        {
          height: 6,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.surfaceElevated,
          overflow: 'hidden',
        },
        style,
      ]}
      {...rest}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: theme.radius.pill,
          backgroundColor: fill[tone],
        }}
      />
    </View>
  );
}
