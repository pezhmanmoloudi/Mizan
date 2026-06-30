import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, type PressableProps, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export type IconButtonVariant = 'plain' | 'filled' | 'tinted';

export type IconButtonProps = Omit<PressableProps, 'children'> & {
  name: IconName;
  accessibilityLabel: string;
  size?: number;
  variant?: IconButtonVariant;
  /** Overrides the variant's default icon color with a semantic color token. */
  color?: keyof ReturnType<typeof useTheme>['colors'];
};

/** Token-driven pressable icon. Used for header actions, overflow menus and tab items. */
export function IconButton({
  name,
  accessibilityLabel,
  size = 22,
  variant = 'plain',
  color,
  disabled,
  style,
  ...rest
}: IconButtonProps) {
  const theme = useTheme();

  const background: Record<IconButtonVariant, string> = {
    plain: theme.colors.transparent,
    filled: theme.colors.primary,
    tinted: theme.colors.primaryMuted,
  };
  const defaultColor: Record<IconButtonVariant, keyof typeof theme.colors> = {
    plain: 'text',
    filled: 'onPrimary',
    tinted: 'primary',
  };
  const iconColor = color ?? defaultColor[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={theme.spacing.sm}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: background[variant],
          borderRadius: theme.radius.pill,
          padding: theme.spacing.sm,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    >
      <Ionicons name={name} size={size} color={theme.colors[iconColor]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
