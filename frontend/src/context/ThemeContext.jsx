import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { AUTO, DARK, LIGHT, THEME } from "@/constants";
import { settings } from "@/context";

export const ThemeContext = React.createContext();

export const ThemeProvider = (props) => {
  const { [THEME]: theme } = useSnapshot(settings);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
    const root = document.getElementsByTagName("html")[0];
    root.className = theme === AUTO ? systemTheme : theme;
  }, [theme]);

  const toggleTheme = () => {
    const getNextTheme = () => {
      switch (theme) {
        case DARK:
          return LIGHT;
        case LIGHT:
          return AUTO;
        default:
          return DARK;
      }
    };
    const nextTheme = getNextTheme();
    settings[THEME] = nextTheme;
  };

  return (
    <ThemeContext
      value={{
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext>
  );
};
