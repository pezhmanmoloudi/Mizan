import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { type TextVariant, useTheme } from '@/theme';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: keyof ReturnType<typeof useTheme>['colors'];
  align?: 'auto' | 'left' | 'right' | 'center';
};

/** Typed text primitive. All copy renders through this so type ramps + colors stay tokenized. */
export function Text({ variant = 'body', color = 'text', align, style, ...rest }: TextProps) {
  const theme = useTheme();
  return (
    <RNText
      style={[
        theme.typography.variants[variant],
        { color: theme.colors[color] },
        align ? { textAlign: align } : null,
        style,
      ]}
      {...rest}
    />
  );
}
