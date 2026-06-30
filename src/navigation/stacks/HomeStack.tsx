import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@/features/home';

import type { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

/** Per-tab stack for Home. Screens are pushed here as the feature grows. */
export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
