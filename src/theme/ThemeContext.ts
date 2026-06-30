import { createContext } from 'react';

import { buildTheme } from './themes';
import type { Theme } from './types';

/**
 * Default context value keeps `useTheme()` usable in isolated tests/storybook without a
 * provider. In the app the value is always overridden by ThemeProvider.
 */
export const ThemeContext = createContext<Theme>(buildTheme('light', 'ltr'));
