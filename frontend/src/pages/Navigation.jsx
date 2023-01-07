import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import { useApp } from 'context';
import { NavMobileMenu, LanguageSelectButton, ThemeSelect } from 'components';
import cryptDefaults from 'components/forms_data/defaultsCryptForm.json';
import libraryDefaults from 'components/forms_data/defaultsLibraryForm.json';
import twdDefaults from 'components/forms_data/defaultsTwdForm.json';
import pdaDefaults from 'components/forms_data/defaultsPdaForm.json';
import { sanitizeFormState } from 'utils';
import {
  searchCryptForm,
  searchLibraryForm,
  searchTwdForm,
  searchPdaForm,
  searchResults,
  deckStore,
} from 'context';

const Link = ({ to, end, ariaLabel, icon, text }) => {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        `flex h-full items-center hover:no-underline ${
          icon ? 'px-3' : 'px-1.5 sm:px-2 pb-0'
        } ${
          isActive
            ? 'bg-borderNestModal text-[#ffffff] dark:bg-borderNestModalDark dark:text-[#ffffff]'
            : 'text-[#afafaf] dark:text-[#afafaf]'
        }`
      }
    >
      {icon ?? text}
    </NavLink>
  );
};

const Navigation = () => {
  const { inventoryMode, toggleInventoryMode, isMobile, username } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const deck = useSnapshot(deckStore).deck;
  const quickCard = useSnapshot(searchResults).quickCard;
  const cryptFormState = useSnapshot(searchCryptForm);
  const libraryFormState = useSnapshot(searchLibraryForm);
  const twdFormState = useSnapshot(searchTwdForm);
  const pdaFormState = useSnapshot(searchPdaForm);

  let pdaUrl = '/pda';
  let twdUrl = '/twd';
  let cryptUrl = '/crypt';
  let libraryUrl = '/library';
  let decksUrl = '/decks';
  let cardsUrl = '/cards';

  if (!isMobile) {
    if (JSON.stringify(cryptFormState) != JSON.stringify(cryptDefaults)) {
      const input = sanitizeFormState('crypt', cryptFormState);
      cryptUrl = `/crypt?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(libraryFormState) != JSON.stringify(libraryDefaults)) {
      const input = sanitizeFormState('library', libraryFormState);
      libraryUrl = `/library?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(twdFormState) != JSON.stringify(twdDefaults)) {
      const input = sanitizeFormState('twd', twdFormState);
      twdUrl = `/twd?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(pdaFormState) != JSON.stringify(pdaDefaults)) {
      const input = sanitizeFormState('pda', pdaFormState);
      pdaUrl = `/pda?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
  }
  if (deck?.deckid) decksUrl = `/decks/${deck.deckid}`;
  if (quickCard) cardsUrl = `/cards/${quickCard}`;

  return (
    <nav
      className={`bg-bgNav dark:bg-bgNavDark ${
        isMobile ? 'fixed bottom-0 w-full' : 'sticky top-0'
      } z-50 `}
    >
      <div className="navbar-container mx-auto flex h-10 justify-between">
        <div className="flex items-center space-x-3">
          {isMobile ? (
            <NavMobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
          ) : (
            <>
              <LanguageSelectButton
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
              <ThemeSelect />
            </>
          )}
          {username &&
            !isMobile &&
            location.pathname !== '/account' &&
            location.pathname !== '/' &&
            location.pathname !== '/changelog' &&
            location.pathname !== '/documentation' &&
            location.pathname !== '/inventory' && (
              <div
                className={`flex h-full items-center px-3 ${
                  inventoryMode
                    ? 'text-[#ffffff] dark:text-[#ffffff]'
                    : 'text-[#afafaf] dark:text-[#afafaf]'
                }`}
                onClick={() => {
                  toggleInventoryMode();
                }}
              >
                <div className="pr-2">
                  {inventoryMode ? (
                    <ToggleOn width="26" height="26" viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff width="26" height="26" viewBox="0 0 16 16" />
                  )}
                </div>
                Inventory Mode
              </div>
            )}
        </div>
        <div className="flex items-center">
          {!isMobile && (
            <>
              <Link
                to="/account"
                icon={
                  username ? (
                    <PersonFill width="20" height="20" viewBox="0 1 16 16" />
                  ) : null
                }
                text={username ? null : 'Login'}
                ariaLabel="Login"
              />
              <Link to="/" text="About" end />
            </>
          )}
          <Link to={pdaUrl} text="PDA" />
          <Link to={twdUrl} text="TWD" />
          <Link to="/inventory" text={isMobile ? 'INV' : 'Inventory'} />
          <Link to={decksUrl} text={isMobile ? 'DKS' : 'Decks'} />
          <Link to={cryptUrl} text={isMobile ? 'CRY' : 'Crypt'} />
          <Link to={libraryUrl} text={isMobile ? 'LIB' : 'Library'} />
          <Link
            to={cardsUrl}
            ariaLabel="Quick card search"
            icon={<LightningFill width="18" height="18" viewBox="0 0 16 16" />}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
