import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

import { Text } from './Text';

export type PillTone = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

export type PillProps = ViewProps & {
  label: string;
  tone?: PillTone;
};

/** Compact status badge with a soft tinted background. Not interactive — see `Chip`. */
export function Pill({ label, tone = 'neutral', style, ...rest }: PillProps) {
  const theme = useTheme();

  const background: Record<PillTone, string> = {
    primary: theme.colors.primaryMuted,
    success: theme.colors.successMuted,
    error: theme.colors.errorMuted,
    warning: theme.colors.warningMuted,
    neutral: theme.colors.surfaceElevated,
  };
  const textColor: Record<PillTone, keyof typeof theme.colors> = {
    primary: 'primary',
    success: 'success',
    error: 'error',
    warning: 'warning',
    neutral: 'textMuted',
  };

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          backgroundColor: background[tone],
          borderRadius: theme.radius.pill,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        },
        style,
      ]}
      {...rest}
    >
      <Text variant="label" color={textColor[tone]}>
        {label}
      </Text>
    </View>
  );
}
