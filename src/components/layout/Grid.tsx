import { Children, type ReactNode } from 'react';
import { View } from 'react-native';

import { rowDirection, type SpacingToken, useTheme } from '@/theme';

export type GridProps = {
  children: ReactNode;
  /** Number of equal-width columns. */
  columns?: number;
  /** Tokenized gutter applied between rows and columns. */
  gap?: SpacingToken;
};

/**
 * Equal-width responsive grid (e.g. the category tiles). Each cell takes `100/columns`
 * width; the gutter is applied as half-gap cell padding with a compensating negative
 * margin so outer edges stay flush with sibling full-width cards. RTL-aware row flow.
 */
export function Grid({ children, columns = 2, gap = 'md' }: GridProps) {
  const theme = useTheme();
  const half = theme.spacing[gap] / 2;
  const cells = Children.toArray(children);

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        flexWrap: 'wrap',
        margin: -half,
      }}
    >
      {cells.map((cell, index) => (
        <View key={index} style={{ width: `${100 / columns}%`, padding: half }}>
          {cell}
        </View>
      ))}
    </View>
  );
}
