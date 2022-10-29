import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp, ThemeProvider, SearchFormsProvider } from 'context';
import Navigation from 'pages/Navigation.jsx';
import Offline from 'components/misc/Offline.jsx';
import { UpdateNotification } from 'components';
import changes from '../../../CHANGES.json';

const RootLayout = () => {
  const { isOnline } = useApp();

  return (
    <>
      <SearchFormsProvider>
        <ThemeProvider>
          <Navigation />
          {!isOnline && <Offline />}
        </ThemeProvider>
        <main>
          <Outlet />
        </main>
      </SearchFormsProvider>
      <UpdateNotification appVersion={changes[0].version} />
    </>
  );
};

export default RootLayout;
