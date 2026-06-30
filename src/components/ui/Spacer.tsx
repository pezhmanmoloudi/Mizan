import { View } from 'react-native';

import { type SpacingToken, useTheme } from '@/theme';

export type SpacerProps = {
  size?: SpacingToken;
  horizontal?: boolean;
};

/** Tokenized whitespace, so layouts never hardcode margins for gaps. */
export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const theme = useTheme();
  const value = theme.spacing[size];
  return <View style={horizontal ? { width: value } : { height: value }} />;
}
