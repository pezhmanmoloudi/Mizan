import { Fragment } from 'react';
import { View } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

import { Text } from './Text';

export type Stat = { label: string; value: string };

export type StatGroupProps = {
  stats: Stat[];
};

/**
 * Evenly distributed value/label columns separated by vertical hairlines — the profile
 * summary strip ("148 transactions · 7 categories · 5 months"). RTL-aware ordering.
 */
export function StatGroup({ stats }: StatGroupProps) {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: rowDirection(theme.direction), alignItems: 'stretch' }}>
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? <View style={{ width: 1, backgroundColor: theme.colors.border }} /> : null}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text variant="heading">{stat.value}</Text>
            <Text variant="label" color="textMuted">
              {stat.label}
            </Text>
          </View>
        </Fragment>
      ))}
    </View>
  );
}
