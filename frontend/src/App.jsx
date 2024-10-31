import React, { Suspense, lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import { useApp } from '@/context';
import { deckServices, miscServices } from '@/services';
import RootLayout from './pages/RootLayout.jsx';
import About from './pages/About.jsx';
import Account from './pages/Account.jsx';
import Cards from './pages/Cards.jsx';
import Crypt from './pages/Crypt.jsx';
import Decks from './pages/Decks.jsx';
import Library from './pages/Library.jsx';
const Changelog = lazy(() => import('./pages/Changelog.jsx'));
const Diff = lazy(() => import('./pages/Diff.jsx'));
const Documentation = lazy(() => import('./pages/Documentation.jsx'));
const Inventory = lazy(() => import('./pages/Inventory.jsx'));
const Pda = lazy(() => import('./pages/Pda.jsx'));
const Playtest = lazy(() => import('./pages/Playtest.jsx'));
const PlaytestManage = lazy(() => import('./components/playtest/PlaytestManage.jsx'));
const PlaytestReportsAll = lazy(() => import('./components/playtest/PlaytestReportsAll.jsx'));
const Review = lazy(() => import('./pages/Review.jsx'));
const TournamentAnalyze = lazy(() => import('./pages/TournamentAnalyze.jsx'));
const Twd = lazy(() => import('./pages/Twd.jsx'));
const TwdCardsHistory = lazy(() => import('./pages/TwdCardsHistory.jsx'));
const TwdCheck = lazy(() => import('./pages/TwdCheck.jsx'));
const TwdHallOfFameCards = lazy(() => import('./pages/TwdHallOfFameCards.jsx'));
const TwdHallOfFameTournaments = lazy(() => import('./pages/TwdHallOfFameTournaments.jsx'));

const RequirePlaytest = ({ children }) => {
  const { isPlaytester } = useApp();
  return isPlaytester ? children : <div />;
};

const RequirePlaytestAdmin = ({ children }) => {
  const { isPlaytestAdmin } = useApp();
  return isPlaytestAdmin ? children : <div />;
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<About />} />
        <Route path="about" element={<Navigate to="/" />} />
        <Route path="account" element={<Account />} />
        <Route path="cards" element={<Cards />}>
          <Route path=":cardid" element={<Cards />} />
        </Route>
        <Route path="crypt" element={<Crypt />} />
        <Route path="library" element={<Library />} />
        <Route path="decks" element={<Decks />} />
        <Route path="decks/:deckid" element={<Decks />} loader={deckServices.deckLoader} />
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
          loader={miscServices.changesLoader}
        />
        <Route
          path="diff"
          element={
            <Suspense fallback={<div />}>
              <Diff />
            </Suspense>
          }
        />
        <Route
          path="diff/:deckidFrom/:deckidTo"
          element={
            <Suspense fallback={<div />}>
              <Diff />
            </Suspense>
          }
        />
        <Route
          path="inventory"
          element={
            <Suspense fallback={<div />}>
              <Inventory />
            </Suspense>
          }
        />
        <Route
          path="pda"
          element={
            <Suspense fallback={<div />}>
              <Pda />
            </Suspense>
          }
        />
        <Route
          path="playtest"
          element={
            <Suspense fallback={<div />}>
              <RequirePlaytest>
                <Playtest />
              </RequirePlaytest>
            </Suspense>
          }
        />
        <Route
          path="playtest/manage"
          element={
            <Suspense fallback={<div />}>
              <RequirePlaytestAdmin>
                <PlaytestManage />
              </RequirePlaytestAdmin>
            </Suspense>
          }
        />
        <Route
          path="playtest/reports"
          element={
            <Suspense fallback={<div />}>
              <RequirePlaytestAdmin>
                <PlaytestReportsAll />
              </RequirePlaytestAdmin>
            </Suspense>
          }
        >
          <Route
            path=":lang"
            element={
              <Suspense fallback={<div />}>
                <RequirePlaytestAdmin>
                  <PlaytestReportsAll />
                </RequirePlaytestAdmin>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="review"
          element={
            <Suspense fallback={<div />}>
              <Review />
            </Suspense>
          }
        />
        <Route
          path="review/:deckid"
          element={
            <Suspense fallback={<div />}>
              <Review />
            </Suspense>
          }
          loader={deckServices.deckLoader}
        />
        <Route
          path="twd"
          element={
            <Suspense fallback={<div />}>
              <Twd />
            </Suspense>
          }
        />
        <Route
          path="twd/check"
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
        <Route
          path="tournament_analyze"
          element={
            <Suspense fallback={<div />}>
              <TournamentAnalyze />
            </Suspense>
          }
        >
          <Route
            path=":tournamentid"
            element={
              <Suspense fallback={<div />}>
                <TournamentAnalyze />
              </Suspense>
            }
          />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
