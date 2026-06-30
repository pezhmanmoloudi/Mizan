import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FAB, type IconName, Text } from '@/components/ui';
import { rowDirection, useTheme } from '@/theme';

import type { MainTabParamList } from '../types';

type TabName = keyof MainTabParamList;

// Icons are not copy, so they stay mapped here; tab labels come from each route's `title`
// option (set with `t(...)` in the navigator), keeping translated text out of this view.
const TAB_ICONS: Record<TabName, { active: IconName; inactive: IconName }> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  TransactionsTab: { active: 'list', inactive: 'list-outline' },
  InsightsTab: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  ProfileTab: { active: 'person', inactive: 'person-outline' },
};

export type BottomTabBarComponentProps = BottomTabBarProps & {
  /** Accessibility label for the center FAB (Add Transaction). */
  addLabel: string;
};

/**
 * Custom bottom tab bar with the Add Transaction FAB docked at the center. The four tabs
 * are split two-per-side around it. Row direction flips for RTL via `rowDirection`.
 */
export function BottomTabBar({
  state,
  descriptors,
  navigation,
  addLabel,
}: BottomTabBarComponentProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderTab = (routeIndex: number) => {
    const route = state.routes[routeIndex];
    if (!route) return null;

    const focused = state.index === routeIndex;
    const label = descriptors[route.key]?.options.title ?? route.name;
    const icon = TAB_ICONS[route.name as TabName];
    const color = focused ? 'primary' : 'textMuted';

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <Pressable
        key={route.key}
        accessibilityRole="button"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={label}
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: 'center',
          gap: theme.spacing.xs,
          paddingVertical: theme.spacing.xs,
        }}
      >
        <Ionicons
          name={focused ? icon.active : icon.inactive}
          size={24}
          color={theme.colors[color]}
        />
        <Text variant="label" color={color}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: rowDirection(theme.direction),
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 0.5,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.xs,
        paddingBottom: insets.bottom + theme.spacing.xs,
        paddingHorizontal: theme.spacing.sm,
      }}
    >
      {renderTab(0)}
      {renderTab(1)}
      <View style={{ paddingHorizontal: theme.spacing.sm }}>
        <FAB
          accessibilityLabel={addLabel}
          onPress={() => navigation.navigate('AddTransaction')}
          style={{ transform: [{ translateY: -theme.spacing.lg }] }}
        />
      </View>
      {renderTab(2)}
      {renderTab(3)}
    </View>
  );
}
