import React from 'react';
import { AppContext, ThemeContext } from '@/context';

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within a AppProvider');

  return context;
};
