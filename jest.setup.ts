// Global Jest setup. Mocks native modules that aren't available in the test environment.
// React Native Testing Library (v12.4+) auto-extends Jest matchers on import, so no
// explicit extend-expect import is required.

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Reanimated ships a Jest mock so its native worklets aren't required in tests.
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
