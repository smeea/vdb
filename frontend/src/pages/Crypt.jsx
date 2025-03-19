import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatAdd,
  ButtonFloatClose,
  ButtonFloatDeckOrSearch,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  FlexGapped,
  ResultCrypt,
} from '@/components';
import { CRYPT, CRYPT_COMPARE, DECK, DECKID, DECKS } from '@/constants';
import { deckStore, searchResults, setCryptResults, setDeck, useApp } from '@/context';
import { getIsEditable } from '@/utils';

const Crypt = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, showFloatingButtons, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [CRYPT]: cryptResults, [CRYPT_COMPARE]: cryptCompare } = useSnapshot(searchResults);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));
  const isEditable = getIsEditable(deck);

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && cryptResults)) ||
      (isMobile && !cryptResults)
    );
  }, [isMobile, isDesktop, addMode, cryptResults]);

  const showToggleAddMode = useMemo(() => {
    return deckStore[DECK] && cryptResults && !isMobile && !isDesktop;
  }, [deckStore[DECK]?.[DECKID], isMobile, isDesktop, cryptResults]);

  const showResultCol = useMemo(() => !(isMobile && !cryptResults), [isMobile, cryptResults]);

  const handleClear = () => setSearchParams();

  useEffect(() => {
    if (!query) setCryptResults();
  }, [query]);

  useEffect(() => {
    if (!deckStore[DECK] && deckStore[DECKS] !== undefined && lastDeckId) {
      setDeck(deckStore[DECKS][lastDeckId]);
    }
  }, [deckStore[DECK]?.[DECKID], deckStore[DECKS], lastDeckId]);

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
      {isMobile && showFloatingButtons && showResultCol && (
        <>
          <ButtonFloatClose handleClose={handleClear} />
          {isEditable && <ButtonFloatAdd />}
        </>
      )}
    </div>
  );
};

export default Crypt;
