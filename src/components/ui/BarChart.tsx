import { View } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

import { Text } from './Text';

export type BarChartDatum = {
  value: number;
  label?: string;
  /** Render as a muted (tinted) bar — e.g. days below a threshold. */
  muted?: boolean;
};

export type BarChartProps = {
  data: BarChartDatum[];
  /** Plot height in px (labels add below). */
  height?: number;
};

/**
 * Lightweight categorical bar chart built from tokenized views (no chart dependency).
 * Bars scale to the max value; RTL-aware so the first datum sits at the start edge.
 * For richer charts, swap the bars for `react-native-svg` while keeping this API.
 */
export function BarChart({ data, height = 96 }: BarChartProps) {
  const theme = useTheme();
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'flex-end',
        gap: theme.spacing.sm,
      }}
    >
      {data.map((datum, index) => (
        <View key={index} style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              width: '100%',
              height: Math.max(2, (datum.value / max) * height),
              borderRadius: theme.radius.sm,
              backgroundColor: datum.muted ? theme.colors.primaryMuted : theme.colors.primary,
            }}
          />
          {datum.label ? (
            <Text
              variant="label"
              color="textMuted"
              align="center"
              style={{ marginTop: theme.spacing.xs }}
            >
              {datum.label}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );
}
