import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Central route registry. The tree is: Root stack → Tabs → per-tab native stacks, with a
 * modal group on the root stack. Feature route params are added to the relevant list here
 * as features land.
 */
export type RootStackParamList = {
  Tabs: NavigatorScreenParams<MainTabParamList> | undefined;
  AddTransaction: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  TransactionsTab: NavigatorScreenParams<TransactionsStackParamList> | undefined;
  InsightsTab: NavigatorScreenParams<InsightsStackParamList> | undefined;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type TransactionsStackParamList = {
  Transactions: undefined;
};

export type InsightsStackParamList = {
  Insights: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

// --- Screen prop helpers --------------------------------------------------------------
// Composite props chain each screen up through its parent navigators so `navigation` is
// typed for both the local stack and the ancestors (tabs + root).

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type TransactionsStackScreenProps<T extends keyof TransactionsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TransactionsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type InsightsStackScreenProps<T extends keyof InsightsStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<InsightsStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, T>,
  MainTabScreenProps<keyof MainTabParamList>
>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
