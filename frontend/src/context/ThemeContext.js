import React, { useState, useLayoutEffect } from 'react';
import {
  initFromStorage,
  setLocalStorage,
  getLocalStorage,
} from 'services/storageServices.js';

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
    const getTheme = () => {
      switch (theme) {
        case 'light':
          return light;
        case 'dark':
          return dark;
        default:
          return [];
      }
    };
    const t = getTheme();
    applyTheme(t);
  }, [theme]);

  const applyTheme = (t) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = t.join(';');
  };

  const toggleTheme = () => {
    const getNextTheme = () => {
      switch (theme) {
        case 'dark':
          return ['light', light];
        case 'light':
          return ['auto', []];
        default:
          return ['dark', dark];
      }
    };
    const nextTheme = getNextTheme();
    setTheme(() => nextTheme[1]);
    setLocalStorage(THEME, nextTheme[0]);
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

const light = [
  '--fg-primary: #252575',
  '--fg-secondary: #6060c0',
  '--fg-third: #6060c0',
  '--fg-name: #3060c0',
  '--fg-red: #c00000',
  '--fg-green: #00a000',
  '--bg-nav: #404060',
  '--bg-primary: #ffffff',
  '--bg-secondary: #e0e5ff',
  '--bg-third: #f0f5ff',
  '--bg-error: #f04040',
  '--bg-error-secondary: #ff8080',
  '--bg-warning: #ffb050',
  '--bg-button: #ffffff',
  '--bg-button-secondary: #ffffff',
  '--bg-checkbox: #ffffff',
  '--bg-checkbox-selected: #7070ff',
  '--border-primary: #80b0ff',
  '--border-secondary: #a0b0ff',
  '--border-third: #a0b0ff',
  '--border-nest-modal: #707085',
  '--clan-icon-brightness: 100%',
  '--icons-brightness: 100%',
  '--logo-brightness: 100%',
];

const dark = [
  '--fg-primary: #e0e0e0',
  '--fg-secondary: #80b0ff',
  '--fg-third: #c0c0e0',
  '--fg-name: #d59000',
  '--fg-red: #f04030',
  '--fg-green: #00d000',
  '--bg-nav: #303040',
  '--bg-primary: #252530',
  '--bg-secondary: #353545',
  '--bg-third: #303040',
  '--bg-error: #901000',
  '--bg-error-secondary: #b03525',
  '--bg-warning: #c06500',
  '--bg-button: #404050',
  '--bg-button-secondary: #303040',
  '--bg-checkbox: #e0e0e0',
  '--bg-checkbox-selected: #6060d0',
  '--border-primary: #505060',
  '--border-secondary: #404050',
  '--border-third: #303040',
  '--border-nest-modal: #404050',
  '--clan-icon-brightness: 65%',
  '--icons-brightness: 85%',
  '--logo-brightness: 150%',
];
