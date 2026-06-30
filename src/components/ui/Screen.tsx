import type { ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

import { type SpacingToken, useTheme } from '@/theme';

export type ScreenProps = {
  children: ReactNode;
  padding?: SpacingToken;
  edges?: readonly Edge[];
  style?: StyleProp<ViewStyle>;
};

/** Root layout wrapper: safe-area aware, themed background, tokenized padding. */
export function Screen({
  children,
  padding = 'lg',
  edges = ['top', 'bottom'],
  style,
}: ScreenProps) {
  const theme = useTheme();
  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[{ flex: 1, padding: theme.spacing[padding] }, style]}>{children}</View>
    </SafeAreaView>
  );
}
