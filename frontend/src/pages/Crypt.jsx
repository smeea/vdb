import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ButtonFloatDeckOrSearch,
  FlexGapped,
} from '@/components';
import { useApp, searchResults, setCryptResults, setDeck, deckStore } from '@/context';
import { DECKID, CRYPT, CRYPT_COMPARE, DECK, DECKS } from '@/constants';

const Crypt = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [CRYPT]: cryptResults, [CRYPT_COMPARE]: cryptCompare } = useSnapshot(searchResults);
  const [searchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && cryptResults)) ||
      (isMobile && !cryptResults)
    );
  }, [isMobile, isDesktop, addMode, cryptResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && cryptResults && !isMobile && !isDesktop;
  }, [deck?.[DECKID], isMobile, isDesktop, cryptResults]);

  const showResultCol = useMemo(() => !(isMobile && !cryptResults), [isMobile, cryptResults]);

  useEffect(() => {
    if (!query) setCryptResults();
  }, [query]);

  useEffect(() => {
    if (!deck && decks !== undefined && lastDeckId) {
      setDeck(decks[lastDeckId]);
    }
  }, [deck?.[DECKID], decks, lastDeckId]);

  return (
    <div className="search-container mx-auto">
      <FlexGapped>
        {!isMobile && (
          <div
            className={twMerge(
              showSearchForm ? 'lg:basis-1/12' : 'sm:basis-5/12 lg:basis-6/12',
              deck && addMode ? 'xl:basis-4/12' : 'xl:basis-2/12',
            )}
          >
            {decks !== undefined && (isDesktop || (!isDesktop && !showSearchForm)) && (
              <DeckSelectorAndDisplay />
            )}
          </div>
        )}
        {showResultCol && (
          <div className="basis-full sm:basis-7/12 lg:basis-6/12 xl:basis-5/12">
            {((isMobile && cryptCompare && cryptResults) || (!isMobile && cryptCompare)) && (
              <div>
                <ResultCrypt cards={cryptCompare} inCompare />
              </div>
            )}
            {cryptResults !== undefined && <ResultCrypt cards={cryptResults} />}
          </div>
        )}
        {showSearchForm && (
          <>
            <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
              <CryptSearchForm />
            </div>
            <div className={deck && addMode ? 'hidden' : 'hidden lg:flex lg:basis-1/12'} />
          </>
        )}
      </FlexGapped>
      {showToggleAddMode && (
        <ButtonFloatDeckOrSearch addMode={addMode} toggleAddMode={toggleAddMode} />
      )}
    </div>
  );
};

export default Crypt;
