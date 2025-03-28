import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import {
  ButtonFloatAdd,
  ButtonFloatClose,
  ButtonFloatDeckOrSearch,
  DeckSelectorAndDisplay,
  FlexGapped,
  LibrarySearchForm,
  ResultLibrary,
} from '@/components';
import { DECK, DECKID, DECKS, LIBRARY, LIBRARY_COMPARE } from '@/constants';
import {
  deckStore,
  searchResults,
  setDeck,
  setLibraryCompare,
  setLibraryResults,
  useApp,
} from '@/context';
import { getIsEditable } from '@/utils';

const Library = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, showFloatingButtons, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [LIBRARY]: libraryResults, [LIBRARY_COMPARE]: libraryCompare } =
    useSnapshot(searchResults);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get('q'));
  const isEditable = getIsEditable(deck);

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && !libraryResults)
    );
  }, [isMobile, isDesktop, addMode, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deckStore[DECK] && libraryResults && !isMobile && !isDesktop;
  }, [deckStore[DECK]?.[DECKID], isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && !libraryResults), [isMobile, libraryResults]);

  const handleClear = () => setSearchParams();

  useEffect(() => {
    if (!query) setLibraryResults();
  }, [query]);

  useEffect(() => {
    if (!deckStore[DECK] && deckStore[DECKS] !== undefined && lastDeckId) {
      setDeck(deckStore[DECKS][lastDeckId]);
    }
  }, [deckStore[DECK]?.[DECKID], decks, lastDeckId]);

  return (
    <div className="search-container mx-auto">
      <FlexGapped>
        <div
          className={twMerge(
            showSearchForm ? 'lg:basis-1/12' : 'sm:basis-5/12 lg:basis-6/12',
            deck && addMode ? 'xl:basis-4/12' : 'xl:basis-2/12',
            'max-sm:hidden',
          )}
        >
          {decks !== undefined && (isDesktop || (!isDesktop && !showSearchForm)) && (
            <DeckSelectorAndDisplay />
          )}
        </div>
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
      {isMobile && showFloatingButtons && showResultCol && (
        <>
          <ButtonFloatClose handleClose={handleClear} />
          {isEditable && <ButtonFloatAdd />}
        </>
      )}
    </div>
  );
};

export default Library;
