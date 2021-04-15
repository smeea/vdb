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
  '--fg-link: #303090',
  '--fg-primary: #000000',
  '--fg-secondary: #6060cc',
  '--fg-third: #7575a5',
  '--fg-gray: gray',
  '--fg-button: #707080',
  '--bg-nav: #303040',
  '--bg-primary: #ffffff',
  '--bg-secondary: #d0d0ea',
  '--bg-third: #eaeaea',
  '--bg-error: #f090a0',
  '--bg-button: #fafafa',
  '--bg-button-hover: #9090a0',
  '--bg-button-secondary: #ffffff',
  '--bg-gray: #495057',
  '--border-primary: gray',
  '--border-secondary: lightgray',
  '--border-third: gray',
  '--border-button: #808080',
  '--border-forms: lightgray',
  '--capacity-opacity: 1',
  '--inventory-miss-full: lightcoral',
  '--inventory-miss-part: #ffa040',
  '--clan-icon-brightness: 1',
];

const darkTheme = [
  '--fg-link: #d59000',
  '--fg-primary: #e0e0e0',
  '--fg-secondary: #a080e0',
  '--fg-third: #9090c0',
  '--fg-gray: darkgray',
  '--fg-button: #c0c0e0',
  '--bg-nav: #303040',
  '--bg-primary: #252530',
  '--bg-secondary: #353545',
  '--bg-third: #303040',
  '--bg-error: #d06080',
  '--bg-button: #404050',
  '--bg-button-hover: #505060',
  '--bg-button-secondary: #303040',
  '--bg-gray: #9090b0',
  '--border-primary: #606070',
  '--border-secondary: #353540',
  '--border-third: #303040',
  '--border-button: #404050',
  '--border-forms: #404050',
  '--capacity-opacity: 0.9',
  '--inventory-miss-full: #c02000',
  '--inventory-miss-part: #706535',
  '--clan-icon-brightness: 0.3',
];
