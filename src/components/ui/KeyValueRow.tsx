import type { ReactNode } from 'react';
import { View } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

import { Text } from './Text';

export type KeyValueRowProps = {
  label: string;
  /** Plain text value. Ignored when `valueSlot` is provided. */
  value?: string;
  /** Rich trailing value (pill, badge) — overrides `value`. */
  valueSlot?: ReactNode;
};

/**
 * Label/value fact row for detail screens (category, date, payment method…). RTL-aware
 * spacing; pair inside a `ListCard` for the divided "facts" panel from the mockup.
 */
export function KeyValueRow({ label, value, valueSlot }: KeyValueRowProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      }}
    >
      <Text variant="caption" color="textMuted">
        {label}
      </Text>
      {valueSlot ?? (
        <Text variant="bodyStrong" style={{ flexShrink: 1 }}>
          {value}
        </Text>
      )}
    </View>
  );
}
