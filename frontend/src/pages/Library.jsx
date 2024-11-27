import React, { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ButtonFloatDeckOrSearch,
  FlexGapped,
} from '@/components';
import {
  useApp,
  searchResults,
  setLibraryResults,
  setLibraryCompare,
  setDeck,
  deckStore,
} from '@/context';
import { DECKID, LIBRARY, LIBRARY_COMPARE, DECK, DECKS } from '@/constants';

const Library = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [LIBRARY]: libraryResults, [LIBRARY_COMPARE]: libraryCompare } =
    useSnapshot(searchResults);
  const [searchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && !libraryResults)
    );
  }, [isMobile, isDesktop, addMode, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && libraryResults && !isMobile && !isDesktop;
  }, [deck?.[DECKID], isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && !libraryResults), [isMobile, libraryResults]);

  useEffect(() => {
    if (!query) setLibraryResults();
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
            {((isMobile && libraryCompare && libraryResults) || (!isMobile && libraryCompare)) && (
              <div>
                <ResultLibrary cards={libraryCompare} setCards={setLibraryCompare} inCompare />
              </div>
            )}
            {libraryResults !== undefined && (
              <ResultLibrary cards={libraryResults} setCards={setLibraryResults} />
            )}
          </div>
        )}
        {showSearchForm && (
          <>
            <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
              <LibrarySearchForm />
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

export default Library;
