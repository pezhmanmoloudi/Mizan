import { ActivityIndicator, Pressable, type PressableProps, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

/** Token-driven button. No hardcoded colors/spacing — all values come from the theme. */
export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const background: Record<ButtonVariant, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.primaryMuted,
    destructive: theme.colors.error,
    ghost: theme.colors.transparent,
  };
  const textColor: Record<ButtonVariant, keyof typeof theme.colors> = {
    primary: 'onPrimary',
    secondary: 'primary',
    destructive: 'onPrimary',
    ghost: 'primary',
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: background[variant],
          borderRadius: theme.radius.md,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        },
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[textColor[variant]]} />
      ) : (
        <Text variant="bodyStrong" color={textColor[variant]} align="center">
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
});
