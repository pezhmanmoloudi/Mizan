import { Component, type ErrorInfo, type ReactNode } from 'react';
import { View } from 'react-native';

import { Button, Spacer, Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { createLogger } from '@/utils';

const log = createLogger('app.errorBoundary');

/** Themed fallback (functional, so it can read tokens via hook). */
function ErrorFallback({ message, onReset }: { message: string; onReset: () => void }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
        padding: theme.spacing.xl,
      }}
    >
      <Text variant="heading" align="center">
        {message}
      </Text>
      <Spacer size="lg" />
      <Button label="Try again" onPress={onReset} />
    </View>
  );
}

type Props = { children: ReactNode; fallbackMessage?: string };
type State = { error: Error | null };

/**
 * Top-level error boundary. Catches render-time errors anywhere below it and shows a
 * recoverable, themed fallback instead of a white screen. Wire crash reporting in
 * `componentDidCatch`.
 */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    log.error('Uncaught render error', { message: error.message, stack: info.componentStack });
  }

  private reset = () => this.setState({ error: null });

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <ErrorFallback
        message={this.props.fallbackMessage ?? 'The app hit an unexpected error.'}
        onReset={this.reset}
      />
    );
  }
}
