import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import RootLayout from './pages/RootLayout.jsx';
import About from './pages/About.jsx';
import Account from './pages/Account.jsx';
import Cards from './pages/Cards.jsx';
import Crypt from './pages/Crypt.jsx';
import Decks from './pages/Decks.jsx';
import Diff from './pages/Diff.jsx';
import Inventory from './pages/Inventory.jsx';
import Library from './pages/Library.jsx';
import Review from './pages/Review.jsx';
import Pda from './pages/Pda.jsx';
import Twd from './pages/Twd.jsx';
import Changelog from './pages/Changelog.jsx';
import Documentation from './pages/Documentation.jsx';
import TwdHallOfFameCards from './pages/TwdHallOfFameCards.jsx';
import TwdHallOfFameTournaments from './pages/TwdHallOfFameTournaments.jsx';
import TwdCardsHistory from './pages/TwdCardsHistory.jsx';
import TwdCheck from './pages/TwdCheck.jsx';
import { loader as deckLoader } from './pages/Decks.jsx';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<About />} />
        <Route path="about" element={<Navigate to="/" />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="account" element={<Account />} />
        <Route path="diff" element={<Diff />} />
        <Route path="diff/:deckidFrom/:deckidTo" element={<Diff />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="decks" element={<Decks />} />
        <Route path="/decks/:deckid" element={<Decks />} loader={deckLoader} />
        <Route path="pda" element={<Pda />} />
        <Route path="review" element={<Review />} />
        <Route path="review/:deckid" element={<Review />} />
        <Route path="twd" element={<Twd />} />
        <Route path="twd/deck_check" element={<TwdCheck />} />
        <Route
          path="twd/hall_of_fame/tournaments"
          element={<TwdHallOfFameTournaments />}
        />
        <Route path="twd/hall_of_fame/cards" element={<TwdHallOfFameCards />} />
        <Route path="twd/cards_history" element={<TwdCardsHistory />} />
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
