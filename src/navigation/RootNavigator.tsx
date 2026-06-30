import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddTransactionScreen } from '@/features/addTransaction';
import { useTheme } from '@/theme';

import { MainTabNavigator } from './MainTabNavigator';
import { toNavigationTheme } from './navigationTheme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * App navigation root. Keep this thin — screens live in their feature folders. The tabs
 * carry the main app; Add Transaction is presented as a modal over the whole tree.
 */
export function RootNavigator() {
  const theme = useTheme();
  return (
    <NavigationContainer theme={toNavigationTheme(theme)}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabNavigator} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
