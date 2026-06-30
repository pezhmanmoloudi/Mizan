import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';

import type { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

/** Per-tab stack for Profile. Settings is pushed from the Profile screen. */
export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
