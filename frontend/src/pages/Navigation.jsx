import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import LightningFill from '@/assets/images/icons/lightning-fill.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { useApp } from '@/context';
import { Toggle, NavMobileMenu, LanguageSelectButton, ThemeSelect } from '@/components';
import cryptDefaults from '@/components/search_forms/forms_data/defaultsCryptForm.json';
import libraryDefaults from '@/components/search_forms/forms_data/defaultsLibraryForm.json';
import twdDefaults from '@/components/search_forms/forms_data/defaultsTwdForm.json';
import pdaDefaults from '@/components/search_forms/forms_data/defaultsPdaForm.json';
import { sanitizeFormState } from '@/utils';
import { DECKID, ID, DECK, CRYPT, LIBRARY, TWD, PDA } from '@/constants';
import {
  searchCryptForm,
  searchLibraryForm,
  searchTwdForm,
  searchPdaForm,
  searchResults,
  limitedStore,
  deckStore,
} from '@/context';

const Link = ({ to, end, icon, text, title }) => {
  return (
    <NavLink
      to={to}
      end={end}
      title={title}
      className={({ isActive }) =>
        twMerge(
          'flex h-full items-center outline-none hover:no-underline',
          icon ? 'px-3' : 'px-2 pb-[2px]',
          isActive
            ? 'bg-borderNestModal text-white dark:bg-borderNestModalDark dark:text-whiteDark'
            : 'text-lightGray dark:text-lightGrayDark',
        )
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

  const location = useLocation();
  const deck = useSnapshot(deckStore)[DECK];
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
    Object.keys(limitedStoreState[CRYPT]).length + Object.keys(limitedStoreState[LIBRARY]).length >
    0;

  if (!isMobile) {
    if (JSON.stringify(cryptFormState) != JSON.stringify(cryptDefaults)) {
      const input = sanitizeFormState(CRYPT, cryptFormState);
      cryptUrl = `/crypt?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(libraryFormState) != JSON.stringify(libraryDefaults)) {
      const input = sanitizeFormState(LIBRARY, libraryFormState);
      libraryUrl = `/library?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(twdFormState) != JSON.stringify(twdDefaults)) {
      const input = sanitizeFormState(TWD, twdFormState);
      twdUrl = `/twd?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(pdaFormState) != JSON.stringify(pdaDefaults)) {
      const input = sanitizeFormState(PDA, pdaFormState);
      pdaUrl = `/pda?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
  }
  if (deck?.[DECKID]) decksUrl = `/decks/${deck[DECKID]}`;
  if (quickCard) cardsUrl = `/cards/${quickCard[ID]}`;

  return (
    <nav className="z-50 bg-bgNav dark:bg-bgNavDark max-sm:fixed max-sm:bottom-0 max-sm:w-full sm:sticky sm:top-0 print:hidden">
      <div className="navbar-container mx-auto flex h-10 justify-between sm:gap-3">
        <div className="flex items-center gap-6">
          {isMobile ? (
            <NavMobileMenu isLimited={isLimited} />
          ) : (
            <>
              <LanguageSelectButton />
              <ThemeSelect />
            </>
          )}
          {!isMobile && (
            <>
              {username && (
                <Toggle
                  isOn={inventoryMode}
                  handleClick={toggleInventoryMode}
                  disabled={location.pathname == '/inventory'}
                  variant="secondary"
                >
                  Inventory Mode
                </Toggle>
              )}
              {(isLimited || limitedMode) && (
                <Toggle isOn={limitedMode} handleClick={toggleLimitedMode} variant="secondary">
                  Limited Mode
                </Toggle>
              )}
              {isPlaytester && (
                <Toggle isOn={playtestMode} handleClick={togglePlaytestMode} variant="secondary">
                  Playtest Mode
                </Toggle>
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
                title={username ? 'Account' : 'Login'}
              />
              {isPlaytester && <Link to="/playtest" text="Playtest" />}
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
            ariaLabel="Quick Card Search"
            title="Quick Card Search"
            icon={<LightningFill width="19" height="19" viewBox="0 0 16 16" />}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
