import React, { useState, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import {
  useApp,
  ThemeProvider,
  SearchFormsProvider,
  SearchResultsProvider,
} from 'context';
import About from 'pages/About.jsx';
import Account from 'pages/Account.jsx';
import Cards from 'pages/Cards.jsx';
import Crypt from 'pages/Crypt.jsx';
import Decks from 'pages/Decks.jsx';
import Diff from 'pages/Diff.jsx';
import Documentation from 'pages/Documentation.jsx';
import Inventory from 'pages/Inventory.jsx';
import Library from 'pages/Library.jsx';
import Navigation from 'pages/Navigation.jsx';
import Pda from 'pages/Pda.jsx';
import Twd from 'pages/Twd.jsx';

import '~/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.styl';

const Changelog = React.lazy(() => import('pages/Changelog.jsx'));

const App = (props) => {
  const { lastDeckId } = useApp();

  return (
    <div className="App">
      <Router>
        <SearchFormsProvider>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>

          <SearchResultsProvider>
            <Routes>
              <Route path="*" element={<Navigate to="/about" />} />
              <Route path="about" element={<About />} />
              <Route path="documentation" element={<Documentation />} />
              <Route
                path="changelog"
                element={
                  <Suspense fallback={<div />}>
                    <Changelog />
                  </Suspense>
                }
              />
              <Route path="account" element={<Account />} />
              <Route path="diff" element={<Diff />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="decks" element={<Decks />} />
              <Route path="pda" element={<Pda />} />
              <Route path="twd" element={<Twd />} />
              <Route path="crypt" element={<Crypt lastDeckId={lastDeckId} />} />
              <Route
                path="library"
                element={<Library lastDeckId={lastDeckId} />}
              />
              <Route path="cards" element={<Cards lastDeckId={lastDeckId} />} />
              <Route
                path="cards/:id"
                element={<Cards lastDeckId={lastDeckId} />}
              />
            </Routes>
          </SearchResultsProvider>
        </SearchFormsProvider>
      </Router>
    </div>
  );
};

export default App;
