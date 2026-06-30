import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { InsightsScreen } from '@/features/insights';

import type { InsightsStackParamList } from '../types';

const Stack = createNativeStackNavigator<InsightsStackParamList>();

/** Per-tab stack for Insights. */
export function InsightsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Insights" component={InsightsScreen} />
    </Stack.Navigator>
  );
}
