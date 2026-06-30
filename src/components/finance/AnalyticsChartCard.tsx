import type { ReactNode } from 'react';

import { Card, Spacer, Text } from '@/components/ui';

export type AnalyticsChartCardProps = {
  title: string;
  /** Optional headline metric shown under the title (e.g. total spend). */
  value?: string;
  /** Optional caption under the value (e.g. comparison vs last month). */
  caption?: string;
  /** Trailing action slot on the title row (e.g. a period picker). */
  action?: ReactNode;
  /** The chart itself — any chart component (`BarChart`, a donut, etc.). */
  children: ReactNode;
  /** Center-align the heading block (used by the donut/summary layout). */
  centered?: boolean;
};

/**
 * Titled container for any analytics visualization. Owns the heading/metric/caption block
 * and spacing so individual charts stay focused on drawing. Chart-agnostic by design — pass
 * the visualization as children rather than specializing per chart type.
 */
export function AnalyticsChartCard({
  title,
  value,
  caption,
  action,
  children,
  centered = false,
}: AnalyticsChartCardProps) {
  const align = centered ? 'center' : undefined;

  return (
    <Card>
      <Text variant="bodyStrong" align={align}>
        {title}
      </Text>
      {value ? (
        <Text variant="heading" align={align} style={{ marginTop: 2 }}>
          {value}
        </Text>
      ) : null}
      {caption ? (
        <Text variant="label" color="textMuted" align={align}>
          {caption}
        </Text>
      ) : null}
      <Spacer size="md" />
      {children}
    </Card>
  );
}
