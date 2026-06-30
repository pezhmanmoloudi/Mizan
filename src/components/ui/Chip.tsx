import { Ionicons } from '@expo/vector-icons';
import { Pressable, type PressableProps, StyleSheet } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

import type { IconName } from './IconButton';
import { Text } from './Text';

export type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  selected?: boolean;
  /** Optional leading icon — covers the "category pill" (icon + label) pattern. */
  leadingIcon?: IconName;
};

/** Selectable filter / category chip. Selected state fills with the primary color. */
export function Chip({
  label,
  selected = false,
  leadingIcon,
  disabled,
  style,
  ...rest
}: ChipProps) {
  const theme = useTheme();
  const contentColor = selected ? 'onPrimary' : 'text';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          flexDirection: rowDirection(theme.direction),
          gap: theme.spacing.xs,
          backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.pill,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        typeof style === 'function' ? null : style,
      ]}
      {...rest}
    >
      {leadingIcon ? (
        <Ionicons name={leadingIcon} size={14} color={theme.colors[contentColor]} />
      ) : null}
      <Text variant="label" color={contentColor}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
