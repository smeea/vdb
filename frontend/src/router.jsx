import { DECKID, DECKID_FROM, DECKID_TO, EVENT, ID } from "@/constants";
import { useApp } from "@/context";
import { deckServices, miscServices } from "@/services";
import { Suspense, lazy } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router";
import About from "./pages/About.jsx";
import Account from "./pages/Account.jsx";
import Cards from "./pages/Cards.jsx";
import Crypt from "./pages/Crypt.jsx";
import Decks from "./pages/Decks.jsx";
import Library from "./pages/Library.jsx";
import RootLayout from "./pages/RootLayout.jsx";

const Changelog = lazy(() => import("./pages/Changelog.jsx"));
const Diff = lazy(() => import("./pages/Diff.jsx"));
const Documentation = lazy(() => import("./pages/Documentation.jsx"));
const Inventory = lazy(() => import("./pages/Inventory.jsx"));
const Pda = lazy(() => import("./pages/Pda.jsx"));
const Playtest = lazy(() => import("./pages/Playtest.jsx"));
const PlaytestManage = lazy(() => import("./components/playtest/PlaytestManage.jsx"));
const PlaytestReportsAll = lazy(() => import("./components/playtest/PlaytestReportsAll.jsx"));
const Review = lazy(() => import("./pages/Review.jsx"));
const Tda = lazy(() => import("./pages/Tda.jsx"));
const Twd = lazy(() => import("./pages/Twd.jsx"));
const TwdCardsHistory = lazy(() => import("./pages/TwdCardsHistory.jsx"));
const TwdCheck = lazy(() => import("./pages/TwdCheck.jsx"));
const TwdHallOfFameCards = lazy(() => import("./pages/TwdHallOfFameCards.jsx"));
const TwdHallOfFameTournaments = lazy(() => import("./pages/TwdHallOfFameTournaments.jsx"));

const RequirePlaytest = ({ children }) => {
  const { isPlaytester } = useApp();
  return isPlaytester ? children : <div />;
};

const RequirePlaytestAdmin = ({ children }) => {
  const { isPlaytestAdmin } = useApp();
  return isPlaytestAdmin ? children : <div />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<About />} />
      <Route path="about" element={<Navigate to="/" />} />
      <Route path="account" element={<Account />} />
      <Route path="cards" element={<Cards />}>
        <Route path={`:${ID}`} element={<Cards />} />
      </Route>
      <Route path="crypt" element={<Crypt />} />
      <Route path="library" element={<Library />} />
      <Route path="decks" element={<Decks />} />
      <Route path={`decks/:${DECKID}`} element={<Decks />} loader={deckServices.deckLoader} />
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
        path={`diff/:${DECKID_FROM}/:${DECKID_TO}`}
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
      />
      <Route
        path="review"
        element={
          <Suspense fallback={<div />}>
            <Review />
          </Suspense>
        }
      />
      <Route
        path={`review/:${DECKID}`}
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
        path="tda"
        element={
          <Suspense fallback={<div />}>
            <Tda />
          </Suspense>
        }
      >
        <Route
          path={`:${EVENT}`}
          element={
            <Suspense fallback={<div />}>
              <Tda />
            </Suspense>
          }
        />
      </Route>
    </Route>,
  ),
);

export default router;
