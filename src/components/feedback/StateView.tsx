import { ActivityIndicator, View } from 'react-native';

import { Button, type IconName, IconTile, Spacer, Text } from '@/components/ui';
import { useTheme } from '@/theme';

const centered = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export function LoadingState({ label }: { label?: string }) {
  const theme = useTheme();
  return (
    <View style={[centered, { padding: theme.spacing.xl }]}>
      <ActivityIndicator color={theme.colors.primary} />
      {label ? (
        <>
          <Spacer size="sm" />
          <Text variant="caption" color="textMuted">
            {label}
          </Text>
        </>
      ) : null}
    </View>
  );
}

export function ErrorState({
  message,
  onRetry,
  retryLabel = 'Retry',
}: {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const theme = useTheme();
  return (
    <View style={[centered, { padding: theme.spacing.xl }]}>
      <Text variant="bodyStrong" color="error" align="center">
        {message}
      </Text>
      {onRetry ? (
        <>
          <Spacer size="lg" />
          <Button label={retryLabel} variant="secondary" onPress={onRetry} />
        </>
      ) : null}
    </View>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: {
  title: string;
  description?: string;
  icon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={[centered, { padding: theme.spacing.xl }]}>
      {icon ? (
        <>
          <IconTile name={icon} size={56} />
          <Spacer size="lg" />
        </>
      ) : null}
      <Text variant="heading" align="center">
        {title}
      </Text>
      {description ? (
        <>
          <Spacer size="sm" />
          <Text variant="body" color="textMuted" align="center">
            {description}
          </Text>
        </>
      ) : null}
      {actionLabel && onAction ? (
        <>
          <Spacer size="lg" />
          <Button label={actionLabel} onPress={onAction} />
        </>
      ) : null}
    </View>
  );
}
