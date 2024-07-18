import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import LightningFill from '@/assets/images/icons/lightning-fill.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { useApp } from '@/context';
import { NavToggle, NavMobileMenu, LanguageSelectButton, ThemeSelect } from '@/components';
import cryptDefaults from '@/components/search_forms/forms_data/defaultsCryptForm.json';
import libraryDefaults from '@/components/search_forms/forms_data/defaultsLibraryForm.json';
import twdDefaults from '@/components/search_forms/forms_data/defaultsTwdForm.json';
import pdaDefaults from '@/components/search_forms/forms_data/defaultsPdaForm.json';
import { sanitizeFormState } from '@/utils';
import {
  searchCryptForm,
  searchLibraryForm,
  searchTwdForm,
  searchPdaForm,
  searchResults,
  limitedStore,
  deckStore,
} from '@/context';

const Link = ({ to, end, ariaLabel, icon, text }) => {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={ariaLabel}
      className={({ isActive }) =>
        `flex h-full items-center outline-none hover:no-underline ${
          icon ? 'px-3' : 'px-2 pb-[2px]'
        } ${
          isActive
            ? 'bg-borderNestModal text-white dark:bg-borderNestModalDark dark:text-whiteDark'
            : 'text-lightGray dark:text-lightGrayDark'
        }`
      }
    >
      {icon ?? text}
    </NavLink>
  );
};

const Navigation = () => {
  const {
    inventoryMode,
    toggleInventoryMode,
    limitedMode,
    toggleLimitedMode,
    isMobile,
    username,
    isPlaytester,
    playtestMode,
    togglePlaytestMode,
  } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const deck = useSnapshot(deckStore).deck;
  const quickCard = useSnapshot(searchResults).quickCard;
  const cryptFormState = useSnapshot(searchCryptForm);
  const libraryFormState = useSnapshot(searchLibraryForm);
  const twdFormState = useSnapshot(searchTwdForm);
  const pdaFormState = useSnapshot(searchPdaForm);
  const limitedStoreState = useSnapshot(limitedStore);

  let pdaUrl = '/pda';
  let twdUrl = '/twd';
  let cryptUrl = '/crypt';
  let libraryUrl = '/library';
  let decksUrl = '/decks';
  let cardsUrl = '/cards';

  const isLimited =
    Object.keys(limitedStoreState.crypt).length + Object.keys(limitedStoreState.library).length > 0;

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
  if (quickCard) cardsUrl = `/cards/${quickCard.Id}`;

  return (
    <nav
      className={`bg-bgNav dark:bg-bgNavDark ${
        isMobile ? 'fixed bottom-0 w-full' : 'sticky top-0'
      } z-50`}
    >
      <div className="navbar-container mx-auto flex h-10 justify-between">
        <div className="flex items-center space-x-6">
          {isMobile ? (
            <NavMobileMenu isLimited={isLimited} showMenu={showMenu} setShowMenu={setShowMenu} />
          ) : (
            <>
              <LanguageSelectButton showMenu={showMenu} setShowMenu={setShowMenu} />
              <ThemeSelect />
            </>
          )}
          {!isMobile &&
            location.pathname !== '/account' &&
            location.pathname !== '/' &&
            location.pathname !== '/changelog' &&
            location.pathname !== '/documentation' && (
              <>
                {username && (
                  <NavToggle
                    isOn={inventoryMode}
                    onToggle={toggleInventoryMode}
                    text="Inventory Mode"
                  />
                )}
                {(isLimited || limitedMode) && (
                  <NavToggle isOn={limitedMode} onToggle={toggleLimitedMode} text="Limited Mode" />
                )}
                {isPlaytester && (
                  <NavToggle
                    isOn={playtestMode}
                    onToggle={togglePlaytestMode}
                    text="Playtest Mode"
                  />
                )}
              </>
            )}
        </div>
        <div className="flex items-center">
          {!isMobile && (
            <>
              <Link
                to="/account"
                icon={username ? <PersonFill width="21" height="21" viewBox="0 1 16 16" /> : null}
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
            icon={<LightningFill width="19" height="19" viewBox="0 0 16 16" />}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
