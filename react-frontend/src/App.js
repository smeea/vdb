import React, { useState, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';
import { useApp, ThemeProvider } from 'context';
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
import Twd from 'pages/Twd.jsx';

import 'assets/css/bootstrap.min.css';
import 'assets/css/style.styl';

const Changelog = React.lazy(() => import('pages/Changelog.jsx'));

function App(props) {
  const {
    whoAmI,
    setInventoryCrypt,
    setInventoryLibrary,
    decks,
    recentDecks,
    updateRecentDecks,
    activeDeck,
    setActiveDeck,
    inventoryDeckAdd,
    inventoryDeckDelete,
    inventoryAddToState,
  } = useApp();

  const [lastDeck, setLastDeck] = useState({});

  useEffect(() => {
    const byTimestamp = (a, b) => {
      return new Date(b[1]) - new Date(a[1]);
    };

    if (decks) {
      const decksForSort = [];

      Object.keys(decks).map((key) => {
        decksForSort.push([decks[key], decks[key].timestamp]);
      });

      const lastDeckArray = decksForSort.sort(byTimestamp)[0];
      if (lastDeckArray) {
        setLastDeck(lastDeckArray[0]);
      }
    }
  }, [decks]);

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (decks) {
      const d = recentDecks.filter((v) => !decks[v.deckid]);
      if (d.length < recentDecks.length) {
        updateRecentDecks(d);
      }
    }
  }, [decks, recentDecks]);

  useEffect(() => {
    if (lastDeck && lastDeck.deckid && !activeDeck.deckid) {
      setActiveDeck({ src: 'my', deckid: lastDeck.deckid });
    }
  }, [lastDeck]);

  return (
    <div className="App">
      <Suspense fallback={<div />}>
        <Router>
          <ThemeProvider>
            <Navigation />
          </ThemeProvider>

          <Routes>
            <Route path="*" element={<Navigate to="/about" />} />
            <Route path="about" element={<About />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="account" element={<Account />} />
            <Route path="diff" element={<Diff />} />
            <Route path="twd" element={<Twd />} />
            <Route
              path="inventory"
              element={
                <Inventory
                  inventoryDeckAdd={inventoryDeckAdd}
                  inventoryDeckDelete={inventoryDeckDelete}
                  inventoryAddToState={inventoryAddToState}
                  setInventoryCrypt={setInventoryCrypt}
                  setInventoryLibrary={setInventoryLibrary}
                />
              }
            />
            <Route path="decks" element={<Decks />} />
            <Route
              path="crypt"
              element={
                <Crypt
                  activeDeck={
                    activeDeck.src == 'my'
                      ? activeDeck
                      : { src: 'my', deckid: lastDeck.deckid }
                  }
                />
              }
            />
            <Route
              path="library"
              element={
                <Library
                  activeDeck={
                    activeDeck.src == 'my'
                      ? activeDeck
                      : { src: 'my', deckid: lastDeck.deckid }
                  }
                />
              }
            />
            <Route path="cards" element={<Cards />} />
            <Route path="cards/:id" element={<Cards />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
