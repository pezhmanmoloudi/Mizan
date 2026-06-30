import { Card, Spacer, Text } from '@/components';

export type OverviewCardProps = {
  label: string;
  value: string;
};

/** Small presentational card for a single overview metric. */
export function OverviewCard({ label, value }: OverviewCardProps) {
  return (
    <Card>
      <Text variant="label" color="textMuted">
        {label.toUpperCase()}
      </Text>
      <Spacer size="xs" />
      <Text variant="title">{value}</Text>
    </Card>
  );
}
