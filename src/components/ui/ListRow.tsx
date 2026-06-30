import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { rowDirection, textAlignStart, useTheme } from '@/theme';

import { type IconName } from './IconButton';
import { IconTile, type IconTileTone } from './IconTile';
import { Text } from './Text';

export type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Leading icon rendered inside an `IconTile`. Ignored when `leading` is provided. */
  icon?: IconName;
  iconTone?: IconTileTone;
  /** Custom leading slot (avatar, custom tile) — overrides `icon`. */
  leading?: ReactNode;
  /** Trailing value text (e.g. a setting's current value). */
  value?: string;
  /** Custom trailing slot (switch, badge) — overrides `value`. */
  trailing?: ReactNode;
  /** Shows a direction-aware disclosure chevron. Implied when `onPress` is set. */
  showChevron?: boolean;
  onPress?: () => void;
};

/**
 * Generic icon + text row — the recurring unit inside grouped cards (settings, account,
 * profile lists). RTL-aware: row direction, text alignment and chevron all flip. Compose
 * inside `ListCard` to get dividers for free.
 */
export function ListRow({
  title,
  subtitle,
  icon,
  iconTone = 'primary',
  leading,
  value,
  trailing,
  showChevron,
  onPress,
}: ListRowProps) {
  const theme = useTheme();
  const align = textAlignStart(theme.direction);
  const withChevron = showChevron ?? !!onPress;

  const content = (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.md,
      }}
    >
      {leading ?? (icon ? <IconTile name={icon} tone={iconTone} size={34} /> : null)}
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong" align={align}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="label" color="textMuted" align={align}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ??
        (value ? (
          <Text variant="caption" color="textMuted">
            {value}
          </Text>
        ) : null)}
      {withChevron ? (
        <Ionicons
          name={theme.isRTL ? 'chevron-back' : 'chevron-forward'}
          size={18}
          color={theme.colors.textMuted}
        />
      ) : null}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      {content}
    </Pressable>
  );
}
