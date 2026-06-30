import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionsScreen } from '@/features/transactions';

import type { TransactionsStackParamList } from '../types';

const Stack = createNativeStackNavigator<TransactionsStackParamList>();

/** Per-tab stack for Transactions. */
export function TransactionsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
}
