import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider, ThemeProvider } from '@/context';
import Navigation from '@/pages/Navigation.jsx';
import {
  IncognitoNotification,
  OfflineNotification,
  UpdateNotification,
} from '@/components';

const RootLayout = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Navigation />
        <OfflineNotification />
        <IncognitoNotification />
      </ThemeProvider>
      <Outlet />
      <UpdateNotification />
    </AppProvider>
  );
};

export default RootLayout;
