import type { ReactNode } from 'react';
import { View } from 'react-native';

import { rowDirection, textAlignStart, useTheme } from '@/theme';

import { Text } from './Text';

export type HeaderProps = {
  title: string;
  subtitle?: string;
  /** Leading slot — typically a back/close IconButton. */
  leading?: ReactNode;
  /** Trailing slot — the single primary action or an overflow IconButton. */
  trailing?: ReactNode;
};

/**
 * Screen header with a title and optional leading/trailing action slots. RTL-aware: the
 * row direction and title alignment flip with the active direction.
 */
export function Header({ title, subtitle, leading, trailing }: HeaderProps) {
  const theme = useTheme();
  const align = textAlignStart(theme.direction);

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,
      }}
    >
      {leading}
      <View style={{ flex: 1 }}>
        <Text variant="title" align={align}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" color="textMuted" align={align}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}
