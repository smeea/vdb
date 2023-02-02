import React, { useMemo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ToggleSearchAddButton,
} from '@/components';
import {
  useApp,
  searchResults,
  setCryptResults,
  setCryptCompare,
  setDeck,
  deckStore,
} from '@/context';

const Crypt = () => {
  const {
    showCryptSearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    lastDeckId,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const cryptResults = useSnapshot(searchResults).crypt;
  const cryptCompare = useSnapshot(searchResults).cryptCompare;
  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && cryptResults)) ||
      (isMobile && showCryptSearch)
    );
  }, [isMobile, isDesktop, addMode, showCryptSearch, cryptResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && cryptResults && !isMobile && !isDesktop;
  }, [deck, isMobile, isDesktop, cryptResults]);

  const showResultCol = useMemo(() => !(isMobile && showCryptSearch));

  useEffect(() => {
    if (!deck && decks !== undefined && lastDeckId) {
      setDeck(decks[lastDeckId]);
    }
  }, [deck, decks, lastDeckId]);

  return (
    <div className="search-container mx-auto">
      <div className="flex sm:gap-4 lg:gap-6 xl:gap-8">
        {!isMobile && (
          <div
            className={`${
              showSearchForm ? 'lg:basis-1/12' : 'sm:basis-5/12 lg:basis-6/12'
            } ${deck && addMode ? 'xl:basis-4/12' : 'xl:basis-2/12'}`}
          >
            {decks !== undefined &&
              (isDesktop || (!isDesktop && !showSearchForm)) && (
                <DeckSelectorAndDisplay />
              )}
          </div>
        )}
        {showResultCol && (
          <div className="sm:basis-7/12 lg:basis-7/12 xl:basis-5/12">
            {((isMobile && cryptCompare && cryptResults) ||
              (!isMobile && cryptCompare)) && (
              <div>
                <ResultCrypt
                  cards={cryptCompare}
                  setCards={setCryptCompare}
                  inCompare
                />
              </div>
            )}
            {cryptResults !== undefined && (
              <ResultCrypt cards={cryptResults} setCards={setCryptResults} />
            )}
          </div>
        )}
        {showSearchForm && (
          <>
            <div className="basis-full p-2 sm:basis-5/12 sm:p-0 lg:basis-4/12 xl:basis-3/12">
              <CryptSearchForm />
            </div>
            <div
              className={`hidden ${
                deck && addMode ? '' : 'lg:flex lg:basis-1/12'
              }`}
            />
          </>
        )}
      </div>
      {showToggleAddMode && (
        <ToggleSearchAddButton
          addMode={addMode}
          toggleAddMode={toggleAddMode}
        />
      )}
    </div>
  );
};

export default Crypt;
