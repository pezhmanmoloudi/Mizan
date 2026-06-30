import { Ionicons } from '@expo/vector-icons';
import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

import type { IconName } from './IconButton';

export type IconTileTone = 'primary' | 'success' | 'error' | 'warning';

export type IconTileProps = ViewProps & {
  name: IconName;
  tone?: IconTileTone;
  /** Square edge length in px. */
  size?: number;
};

/**
 * Rounded, soft-tinted square holding a single icon — the recurring leading element for
 * transaction rows, category tiles and settings rows.
 */
export function IconTile({ name, tone = 'primary', size = 38, style, ...rest }: IconTileProps) {
  const theme = useTheme();

  const background: Record<IconTileTone, string> = {
    primary: theme.colors.primaryMuted,
    success: theme.colors.successMuted,
    error: theme.colors.errorMuted,
    warning: theme.colors.warningMuted,
  };
  const iconColor: Record<IconTileTone, keyof typeof theme.colors> = {
    primary: 'primary',
    success: 'success',
    error: 'error',
    warning: 'warning',
  };

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: background[tone],
          borderRadius: theme.radius.md,
        },
        style,
      ]}
      {...rest}
    >
      <Ionicons name={name} size={Math.round(size * 0.5)} color={theme.colors[iconColor[tone]]} />
    </View>
  );
}
