import { Children, Fragment, type ReactNode } from 'react';

import { useTheme } from '@/theme';

import { Card, type CardProps } from './Card';
import { Divider } from './Divider';

export type ListCardProps = Omit<CardProps, 'padding'> & {
  children: ReactNode;
  /** Insert hairline dividers between rows (the grouped-list pattern). */
  dividers?: boolean;
};

/**
 * Surface that groups a set of rows with consistent inset and optional dividers — the
 * recurring "card full of rows" pattern (recent transactions, settings groups, detail
 * facts). Falsy children are skipped so dividers never bracket empty slots.
 */
export function ListCard({ children, dividers = true, style, ...rest }: ListCardProps) {
  const theme = useTheme();
  const rows = Children.toArray(children).filter(Boolean);

  return (
    <Card
      padding="none"
      style={[{ paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.xs }, style]}
      {...rest}
    >
      {rows.map((row, index) => (
        <Fragment key={index}>
          {row}
          {dividers && index < rows.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </Card>
  );
}
