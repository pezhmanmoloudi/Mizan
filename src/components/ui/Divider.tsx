import { View, type ViewProps } from 'react-native';

import { type SpacingToken, useTheme } from '@/theme';

export type DividerProps = ViewProps & {
  /** Optional horizontal inset (start & end) so dividers align with row content. */
  inset?: SpacingToken;
};

/** Hairline separator used between grouped rows inside cards. */
export function Divider({ inset = 'none', style, ...rest }: DividerProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: theme.colors.border,
          marginHorizontal: theme.spacing[inset],
        },
        style,
      ]}
      {...rest}
    />
  );
}
