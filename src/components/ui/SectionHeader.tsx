import { Pressable, View } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

import { Text } from './Text';

export type SectionHeaderProps = {
  title: string;
  /** Optional trailing link (e.g. "See all"). */
  actionLabel?: string;
  onActionPress?: () => void;
};

/** Title row that precedes a grouped card/list, with an optional trailing text action. */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
      }}
    >
      <Text variant="bodyStrong">{title}</Text>
      {actionLabel ? (
        <Pressable accessibilityRole="button" onPress={onActionPress} hitSlop={theme.spacing.sm}>
          <Text variant="label" color="primary">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
