import type { ReactNode } from 'react';
import { View } from 'react-native';

import { SectionHeader } from '@/components/ui';
import { type SpacingToken, useTheme } from '@/theme';

export type SectionProps = {
  children: ReactNode;
  /** Optional section title; when set, renders a `SectionHeader`. */
  title?: string;
  /** Optional trailing action on the title row (e.g. "See all"). */
  actionLabel?: string;
  onActionPress?: () => void;
  /** Vertical rhythm above the section. Encodes the mockup's section spacing. */
  spacingTop?: SpacingToken;
  /** Gap between the header and the section body. */
  gap?: SpacingToken;
};

/**
 * A titled content block with consistent vertical rhythm. Composing screens out of
 * `Section`s keeps section spacing uniform instead of scattering ad-hoc margins.
 */
export function Section({
  children,
  title,
  actionLabel,
  onActionPress,
  spacingTop = 'lg',
  gap = 'sm',
}: SectionProps) {
  const theme = useTheme();

  return (
    <View style={{ marginTop: theme.spacing[spacingTop] }}>
      {title ? (
        <SectionHeader title={title} actionLabel={actionLabel} onActionPress={onActionPress} />
      ) : null}
      <View style={{ marginTop: title ? theme.spacing[gap] : 0 }}>{children}</View>
    </View>
  );
}
