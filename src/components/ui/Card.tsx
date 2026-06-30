import { View, type ViewProps } from 'react-native';

import { type ShadowToken, type SpacingToken, useTheme } from '@/theme';

export type CardProps = ViewProps & {
  padding?: SpacingToken;
  elevation?: ShadowToken;
};

/** Surface container with tokenized padding, radius and elevation. */
export function Card({ padding = 'lg', elevation = 'sm', style, ...rest }: CardProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          padding: theme.spacing[padding],
          borderWidth: StyleSheetHairline,
          borderColor: theme.colors.border,
        },
        theme.shadows[elevation],
        style,
      ]}
      {...rest}
    />
  );
}

// Hairline border keeps cards crisp on both schemes.
const StyleSheetHairline = 0.5;
