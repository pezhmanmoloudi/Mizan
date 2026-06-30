import { Pressable, View } from 'react-native';

import { rowDirection, useTheme } from '@/theme';

export type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

// Fixed control dimensions (track/knob), not spacing values.
const TRACK_WIDTH = 38;
const TRACK_HEIGHT = 22;
const KNOB = 18;

/** Controlled on/off toggle. Knob aligns to the reading-direction end when on (RTL-aware). */
export function Switch({ value, onValueChange, disabled, accessibilityLabel }: SwitchProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={{
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        borderRadius: theme.radius.pill,
        backgroundColor: value ? theme.colors.primary : theme.colors.borderStrong,
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
        paddingHorizontal: 2,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <View
        style={{
          width: KNOB,
          height: KNOB,
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.onPrimary,
        }}
      />
    </Pressable>
  );
}
