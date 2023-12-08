import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider, ThemeProvider } from '@/context';
import Navigation from '@/pages/Navigation.jsx';
import { OfflineNotification, UpdateNotification } from '@/components';

const RootLayout = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Navigation />
        <OfflineNotification />
      </ThemeProvider>
      <main>
        <Outlet />
      </main>
      <UpdateNotification />
    </AppProvider>
  );
};

export default RootLayout;
