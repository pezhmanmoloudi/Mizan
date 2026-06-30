import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Central route registry. Feature route params are added here as features land. */
export type RootStackParamList = {
  Home: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
