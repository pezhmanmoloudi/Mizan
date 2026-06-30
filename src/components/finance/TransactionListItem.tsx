import { Row } from '@/components/layout';
import { IconButton, type IconName, ListRow, Text } from '@/components/ui';

export type TransactionFlow = 'income' | 'expense';

export type TransactionListItemProps = {
  title: string;
  /** Secondary line, e.g. "Today · Food". */
  subtitle?: string;
  /** Pre-formatted, sign-aware amount string (formatting belongs to the caller/util). */
  amount: string;
  flow: TransactionFlow;
  icon?: IconName;
  onPress?: () => void;
  /** Shows the overflow affordance when provided. */
  onMorePress?: () => void;
  moreLabel?: string;
};

/**
 * One transaction row: category tile + title/subtitle + flow-tinted amount + optional
 * overflow. Built on `ListRow`, so layout, RTL and press feedback are shared, not forked.
 * Purely presentational — amount sign/format and handlers are supplied by the caller.
 */
export function TransactionListItem({
  title,
  subtitle,
  amount,
  flow,
  icon = 'pricetag',
  onPress,
  onMorePress,
  moreLabel = 'More',
}: TransactionListItemProps) {
  return (
    <ListRow
      icon={icon}
      iconTone={flow === 'income' ? 'success' : 'primary'}
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      showChevron={false}
      trailing={
        <Row gap="xs">
          <Text variant="bodyStrong" color={flow === 'income' ? 'success' : 'error'}>
            {amount}
          </Text>
          {onMorePress ? (
            <IconButton
              name="ellipsis-vertical"
              accessibilityLabel={moreLabel}
              size={16}
              color="textMuted"
              onPress={onMorePress}
            />
          ) : null}
        </Row>
      }
    />
  );
}
