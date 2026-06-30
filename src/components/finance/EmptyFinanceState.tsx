import { EmptyState } from '@/components/feedback';
import type { IconName } from '@/components/ui';

export type EmptyFinanceStateProps = {
  title: string;
  description?: string;
  /** Defaults to a wallet glyph; override per context (receipts, charts…). */
  icon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * Finance-flavored preset of `EmptyState` with a sensible default icon. Keeps empty
 * screens (no transactions / no insights yet) visually consistent without re-specifying
 * the icon each time. Falls through to the generic `EmptyState` for everything else.
 */
export function EmptyFinanceState({ icon = 'wallet-outline', ...rest }: EmptyFinanceStateProps) {
  return <EmptyState icon={icon} {...rest} />;
}
