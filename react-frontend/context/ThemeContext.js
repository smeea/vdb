import React, { useState, useLayoutEffect } from 'react';

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export default ThemeContext;

export const ThemeProvider = (props) => {
  const [dark, setDark] = useState(window.localStorage.getItem('darkTheme'));

  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem('darkTheme');

    if (lastTheme === 'true') {
      setDark(true);
      applyTheme(darkTheme);
    } else {
      setDark(false);
      applyTheme(lightTheme);
    }
  }, [dark]);

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  };

  const toggle = () => {
    setDark(!dark);
    window.localStorage.setItem('darkTheme', !dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
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
  '--fg-button: #707080',
  '--bg-nav: #303040',
  '--bg-primary: #ffffff',
  '--bg-secondary: #d0d0ea',
  '--bg-third: #eaeaea',
  '--bg-error: #f090a0',
  '--bg-button: #fafafa',
  '--border-primary: gray',
  '--border-secondary: lightgray',
  '--border-button: #808080',
];

const darkTheme = [
  '--fg-link: #b0b0f0',
  '--fg-primary: #e0e0e0',
  '--fg-secondary: #8080b0',
  '--fg-button: #e0e0e0',
  '--bg-nav: #303040',
  '--bg-primary: #252530',
  '--bg-secondary: #353545',
  '--bg-third: #303040',
  '--bg-error: #d06080',
  '--bg-button: #404050',
  '--border-primary: #606070',
  '--border-secondary: #353540',
  '--border-button: #404050',
];
