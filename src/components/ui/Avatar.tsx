import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/theme';

import { Text } from './Text';

export type AvatarProps = ViewProps & {
  /** Initials shown when there is no image (image support added later). */
  initials?: string;
  /** Diameter in px. */
  size?: number;
};

/** Circular user avatar. Falls back to tinted initials. */
export function Avatar({ initials, size = 40, style, ...rest }: AvatarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.primaryMuted,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      {...rest}
    >
      {initials ? (
        <Text variant="bodyStrong" color="primary">
          {initials}
        </Text>
      ) : null}
    </View>
  );
}
