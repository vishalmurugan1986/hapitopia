import React, { createContext, useContext } from 'react';
import { THEMES } from './themes';

const ThemeContext = createContext(THEMES.light);

/** Provides the resolved theme (`T`) to every design-system component. */
export function ThemeProvider({ theme, children }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Read the active theme. Components accept an explicit `T` prop override too. */
export function useTheme(override) {
  const ctx = useContext(ThemeContext);
  return override || ctx;
}
