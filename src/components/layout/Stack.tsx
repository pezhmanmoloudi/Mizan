import type { ReactNode } from 'react';
import { type FlexAlignType, View, type ViewProps, type ViewStyle } from 'react-native';

import { rowDirection, type SpacingToken, useTheme } from '@/theme';

export type StackProps = ViewProps & {
  children?: ReactNode;
  /** Main-axis orientation. Horizontal stacks resolve their direction RTL-aware. */
  direction?: 'vertical' | 'horizontal';
  /** Tokenized gap between children — replaces manual `Spacer` chains. */
  gap?: SpacingToken;
  align?: FlexAlignType;
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  /** Convenience for `flex: n` so callers don't reach for inline styles. */
  flex?: number;
};

/**
 * Tokenized flex container. The single building block for screen layout: it owns spacing
 * (via `gap`) and RTL-aware row direction so features never hardcode margins or `left/right`.
 */
export function Stack({
  children,
  direction = 'vertical',
  gap = 'none',
  align,
  justify,
  wrap = false,
  flex,
  style,
  ...rest
}: StackProps) {
  const theme = useTheme();
  const isHorizontal = direction === 'horizontal';

  return (
    <View
      style={[
        {
          flexDirection: isHorizontal ? rowDirection(theme.direction) : 'column',
          gap: theme.spacing[gap],
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          flex,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
