import { StatusBar } from 'expo-status-bar';

import { LoadingState } from '@/components';
import { RootNavigator } from '@/navigation';

import { AppProviders } from './providers';
import { useBootstrap } from './useBootstrap';

function Root() {
  const { ready } = useBootstrap();
  if (!ready) return <LoadingState />;
  return <RootNavigator />;
}

/** Application entry composition. Kept thin: providers + bootstrap gate + navigation. */
export function App() {
  return (
    <AppProviders>
      <StatusBar style="auto" />
      <Root />
    </AppProviders>
  );
}
