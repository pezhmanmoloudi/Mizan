import { Ionicons } from '@expo/vector-icons';
import { Pressable, type PressableProps, StyleSheet } from 'react-native';

import { useTheme } from '@/theme';

import type { IconName } from './IconButton';

export type FABProps = Omit<PressableProps, 'children'> & {
  accessibilityLabel: string;
  icon?: IconName;
  iconSize?: number;
};

// Fixed component dimension (mirrors Button's fixed minHeight), not a spacing value.
const DIAMETER = 56;

/**
 * Floating action button. Per the UI rules this is reserved for a single primary action
 * (Add Transaction) and is rendered docked at the center of the bottom tab bar.
 */
export function FAB({
  accessibilityLabel,
  icon = 'add',
  iconSize = 28,
  disabled,
  style,
  ...rest
}: FABProps) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        theme.shadows.md,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.pill,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        },
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    >
      <Ionicons name={icon} size={iconSize} color={theme.colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: DIAMETER,
    height: DIAMETER,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
