import { useState } from 'react';
import { TextInput, type TextInputProps, View, type ViewStyle } from 'react-native';

import { textAlignStart, useTheme } from '@/theme';

import { Spacer } from './Spacer';
import { Text } from './Text';

export type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
};

/**
 * Labeled text input. Token-driven, RTL-aware text alignment, and a focus/error border
 * state. Keeps copy out of the component — labels and errors are passed in by screens.
 */
export function TextField({
  label,
  error,
  containerStyle,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.colors.error
    : focused
      ? theme.colors.primary
      : theme.colors.border;

  return (
    <View style={containerStyle}>
      {label ? (
        <>
          <Text variant="label" color="textMuted">
            {label}
          </Text>
          <Spacer size="xs" />
        </>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={[
          theme.typography.variants.body,
          {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor,
            borderRadius: theme.radius.md,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            color: theme.colors.text,
            textAlign: textAlignStart(theme.direction),
          },
        ]}
        {...rest}
      />
      {error ? (
        <>
          <Spacer size="xs" />
          <Text variant="caption" color="error">
            {error}
          </Text>
        </>
      ) : null}
    </View>
  );
}
