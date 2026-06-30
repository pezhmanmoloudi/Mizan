import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { Row, Stack } from '@/components/layout';
import { type IconName, Text } from '@/components/ui';
import { rowDirection, useTheme } from '@/theme';

export type SummaryStat = {
  label: string;
  value: string;
  icon?: IconName;
};

export type FinancialSummaryCardProps = {
  /** Caption above the headline figure, e.g. "Total balance". */
  label: string;
  /** Pre-formatted headline amount. */
  amount: string;
  /** Inline secondary figures (income / expense) shown as translucent chips. */
  stats?: SummaryStat[];
};

/**
 * The brand "hero" balance surface: primary-filled card with a headline amount and
 * optional inline stat chips. Uses the `onPrimary*` tokens so text/chips stay legible on
 * the primary fill across both schemes. RTL-aware chip row.
 */
export function FinancialSummaryCard({ label, amount, stats }: FinancialSummaryCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
        },
        theme.shadows.md,
      ]}
    >
      <Text variant="label" color="onPrimary" style={{ opacity: 0.85 }}>
        {label}
      </Text>
      <Text variant="amount" color="onPrimary" style={{ marginTop: theme.spacing.xs }}>
        {amount}
      </Text>

      {stats && stats.length > 0 ? (
        <View
          style={{
            flexDirection: rowDirection(theme.direction),
            gap: theme.spacing.sm,
            marginTop: theme.spacing.lg,
          }}
        >
          {stats.map((stat) => (
            <Row
              key={stat.label}
              gap="sm"
              flex={1}
              style={{
                backgroundColor: theme.colors.onPrimaryMuted,
                borderRadius: theme.radius.md,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.md,
              }}
            >
              {stat.icon ? (
                <Ionicons name={stat.icon} size={16} color={theme.colors.onPrimary} />
              ) : null}
              <Stack>
                <Text variant="label" color="onPrimary" style={{ opacity: 0.85 }}>
                  {stat.label}
                </Text>
                <Text variant="bodyStrong" color="onPrimary">
                  {stat.value}
                </Text>
              </Stack>
            </Row>
          ))}
        </View>
      ) : null}
    </View>
  );
}
