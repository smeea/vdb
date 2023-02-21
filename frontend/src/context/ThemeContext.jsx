import React, { useState, useLayoutEffect } from 'react';
import {
  initFromStorage,
  setLocalStorage,
  getLocalStorage,
} from '@/services/storageServices.js';

const ThemeContext = React.createContext({
  theme: 'auto',
  toggleTheme: () => {},
});

const THEME = 'theme';

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error(`useTheme must be used within a ThemeProvider`);

  return context;
};

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(getLocalStorage(THEME));

  useLayoutEffect(() => {
    initFromStorage(THEME, 'auto', setTheme);

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const root = document.getElementsByTagName('html')[0];
    root.className = theme === 'auto' ? systemTheme : theme;
  }, [theme]);

  const toggleTheme = () => {
    const getNextTheme = () => {
      switch (theme) {
        case 'dark':
          return 'light';
        case 'light':
          return 'auto';
        default:
          return 'dark';
      }
    };
    const nextTheme = getNextTheme();
    setTheme(nextTheme);
    setLocalStorage(THEME, nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
