import type { ReactNode } from 'react';

import type { AsyncStatus } from '@/hooks';

import { ErrorState, LoadingState } from './StateView';

export type AsyncBoundaryProps = {
  status: AsyncStatus;
  error?: Error | null;
  onRetry?: () => void;
  loadingLabel?: string;
  children: ReactNode;
};

/**
 * Declarative renderer for the `useAsync` state machine. Keeps screens free of
 * loading/error branching boilerplate.
 */
export function AsyncBoundary({
  status,
  error,
  onRetry,
  loadingLabel,
  children,
}: AsyncBoundaryProps) {
  if (status === 'pending' || status === 'idle') {
    return <LoadingState label={loadingLabel} />;
  }
  if (status === 'error') {
    return <ErrorState message={error?.message ?? 'Something went wrong.'} onRetry={onRetry} />;
  }
  return <>{children}</>;
}
