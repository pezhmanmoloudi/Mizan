import type { ReactNode } from 'react';
import { ScrollView, type StyleProp, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

import { type SpacingToken, useTheme } from '@/theme';

export type ScrollScreenProps = {
  children: ReactNode;
  /** Pinned, non-scrolling slot above the scroll area (e.g. a `Header`). */
  header?: ReactNode;
  /** Absolutely positioned overlay (e.g. a docked FAB). */
  floating?: ReactNode;
  /** Tokenized horizontal/vertical content padding. */
  padding?: SpacingToken;
  edges?: readonly Edge[];
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Scrolling screen scaffold: safe-area + themed background + a scrollable, tokenized
 * content area, with optional pinned header and floating overlay slots. This is the base
 * template for dashboard, list, analytics, settings and detail screens.
 */
export function ScrollScreen({
  children,
  header,
  floating,
  padding = 'lg',
  edges = ['top', 'bottom'],
  contentStyle,
}: ScrollScreenProps) {
  const theme = useTheme();
  const pad = theme.spacing[padding];

  return (
    <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {header ? <View style={{ paddingHorizontal: pad, paddingTop: pad }}>{header}</View> : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ padding: pad }, contentStyle]}
      >
        {children}
      </ScrollView>
      {floating}
    </SafeAreaView>
  );
}
