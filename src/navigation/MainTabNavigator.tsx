import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTranslation } from '@/localization';

import { BottomTabBar } from './components/BottomTabBar';
import { HomeStack } from './stacks/HomeStack';
import { InsightsStack } from './stacks/InsightsStack';
import { ProfileStack } from './stacks/ProfileStack';
import { TransactionsStack } from './stacks/TransactionsStack';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Bottom tab navigator. Each tab hosts its own native stack. The tab bar is fully custom
 * (center-docked Add Transaction FAB); tab labels are provided here via `title` so copy
 * stays translated and out of the tab bar view.
 */
export function MainTabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} addLabel={t('addTransaction.title')} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: t('tabs.home') }} />
      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsStack}
        options={{ title: t('tabs.transactions') }}
      />
      <Tab.Screen
        name="InsightsTab"
        component={InsightsStack}
        options={{ title: t('tabs.insights') }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: t('tabs.profile') }}
      />
    </Tab.Navigator>
  );
}
