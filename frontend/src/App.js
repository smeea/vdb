import React, { Suspense } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import RootLayout from 'pages/RootLayout.jsx';
import About from 'pages/About.jsx';
import Account from 'pages/Account.jsx';
import Cards from 'pages/Cards.jsx';
import Crypt from 'pages/Crypt.jsx';
import Decks, { fetchDeck } from 'pages/Decks.jsx';
import Diff from 'pages/Diff.jsx';
import Inventory from 'pages/Inventory.jsx';
import Library from 'pages/Library.jsx';
import Review from 'pages/Review.jsx';
import Pda from 'pages/Pda.jsx';
import Twd from 'pages/Twd.jsx';

import '~/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.sass';

const Changelog = React.lazy(() => import('pages/Changelog.jsx'));
const Documentation = React.lazy(() => import('pages/Documentation.jsx'));
const TwdHallOfFameCards = React.lazy(() =>
  import('pages/TwdHallOfFameCards.jsx')
);
const TwdHallOfFameTournaments = React.lazy(() =>
  import('pages/TwdHallOfFameTournaments.jsx')
);
const TwdCardsHistory = React.lazy(() => import('pages/TwdCardsHistory.jsx'));
const TwdCheck = React.lazy(() => import('pages/TwdCheck.jsx'));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<About />} />
        <Route path="about" element={<Navigate to="/" />} />
        <Route
          path="documentation"
          element={
            <Suspense fallback={<div />}>
              <Documentation />
            </Suspense>
          }
        />
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
        <Route path="diff/:deckidFrom/:deckidTo" element={<Diff />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="decks" element={<Decks />} />
        <Route
          path="/decks/:deckid"
          element={<Decks />}
          errorElement={<Decks />}
          loader={fetchDeck}
        />
        <Route path="pda" element={<Pda />} />
        <Route path="review" element={<Review />} />
        <Route path="review/:deckid" element={<Review />} />
        <Route path="twd" element={<Twd />} />
        <Route
          path="twd/deck_check"
          element={
            <Suspense fallback={<div />}>
              <TwdCheck />
            </Suspense>
          }
        />
        <Route
          path="twd/hall_of_fame/tournaments"
          element={
            <Suspense fallback={<div />}>
              <TwdHallOfFameTournaments />
            </Suspense>
          }
        />
        <Route
          path="twd/hall_of_fame/cards"
          element={
            <Suspense fallback={<div />}>
              <TwdHallOfFameCards />
            </Suspense>
          }
        />
        <Route
          path="twd/cards_history"
          element={
            <Suspense fallback={<div />}>
              <TwdCardsHistory />
            </Suspense>
          }
        />
        <Route path="crypt" element={<Crypt />} />
        <Route path="library" element={<Library />} />
        <Route path="cards" element={<Cards />}>
          <Route path=":cardid" element={<Cards />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
