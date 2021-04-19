import React, { useState, useLayoutEffect } from 'react';

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export default ThemeContext;

export const ThemeProvider = (props) => {
  const [isDarkTheme, setDarkTheme] = useState(
    window.localStorage.getItem('darkTheme')
  );

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');

    if (lastTheme === 'true') {
      setDarkTheme(true);
      applyTheme(darkTheme);
    } else {
      setDarkTheme(false);
      applyTheme(lightTheme);
    }
  }, [isDarkTheme]);

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  };

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
    window.localStorage.setItem('darkTheme', !isDarkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

const lightTheme = [
  '--fg-primary: #202530',
  '--fg-secondary: #6060cc',
  '--fg-third: #7575a5',
  '--fg-gray: #808080',
  '--fg-button: #707080',
  '--fg-name: #306090',
  '--bg-nav: #303040',
  '--bg-primary: #ffffff',
  '--bg-secondary: #d0d0ea',
  '--bg-third: #eaeaea',
  '--bg-error: #f08080',
  '--bg-warning: #ffa040',
  '--bg-button: #ffffff',
  '--bg-button-hover: #707580',
  '--bg-button-secondary: #ffffff',
  '--bg-menu-focused: #c0c0ff',
  '--bg-menu-selected: #7070ff',
  '--bg-gray: #495057',
  '--border-primary: #808080',
  '--border-secondary: #d3d3d3',
  '--border-third: #808080',
  '--border-button: #808080',
  '--border-forms: #d3d3d3',
  '--clan-icon-brightness: 100%',
  '--icons-brightness: 100%',
  '--logo-brightness: 100%',
];

const darkTheme = [
  '--fg-primary: #e0e0e0',
  '--fg-secondary: #b090ff',
  '--fg-third: #9090c0',
  '--fg-gray: #a9a9a9',
  '--fg-button: #c0c0e0',
  '--fg-name: #d59000',
  '--bg-nav: #303040',
  '--bg-primary: #252530',
  '--bg-secondary: #353545',
  '--bg-third: #303040',
  '--bg-error: #952010',
  '--bg-warning: #b08000',
  '--bg-button: #404050',
  '--bg-button-hover: #505060',
  '--bg-button-secondary: #303040',
  '--bg-menu-focused: #353545',
  '--bg-menu-selected: #505060',
  '--bg-gray: #9090b0',
  '--border-primary: #606070',
  '--border-secondary: #353540',
  '--border-third: #303040',
  '--border-button: #404050',
  '--border-forms: #404050',
  '--clan-icon-brightness: 65%',
  '--icons-brightness: 85%',
  '--logo-brightness: 150%',
];
