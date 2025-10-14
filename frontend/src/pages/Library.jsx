import { Activity, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  ButtonFloatAdd,
  ButtonFloatClose,
  ButtonFloatDeckOrSearch,
  DeckSelectorAndDisplay,
  FlexGapped,
  LibrarySearchForm,
  ResultLibrary,
} from "@/components";
import { DECK, DECKID, DECKS, LIBRARY, LIBRARY_COMPARE } from "@/constants";
import {
  deckStore,
  searchResults,
  setDeck,
  setLibraryCompare,
  setLibraryResults,
  useApp,
} from "@/context";
import { getIsEditable } from "@/utils";

const Library = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, showFloatingButtons, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [LIBRARY]: libraryResults, [LIBRARY_COMPARE]: libraryCompare } =
    useSnapshot(searchResults);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));
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
            showSearchForm ? "lg:basis-1/12" : "sm:basis-5/12 lg:basis-6/12",
            deck && addMode ? "xl:basis-4/12" : "xl:basis-2/12",
            "max-sm:hidden",
          )}
        >
          <Activity mode={decks !== undefined && (isDesktop || (!isDesktop && !showSearchForm)) ? 'visible' : 'hidden'}>
              <DeckSelectorAndDisplay />
          </Activity>
        </div>
        <Activity mode={showResultCol ? "visible" : "hidden"}>
          <div className="basis-full sm:basis-7/12 lg:basis-6/12 xl:basis-5/12">
            <Activity mode={((isMobile && libraryCompare && libraryResults) || (!isMobile && libraryCompare)) ? "visible" : "hidden"}>
              <div>
                <ResultLibrary cards={libraryCompare} setCards={setLibraryCompare} inCompare />
              </div>
            </Activity>
            <Activity mode={libraryResults !== undefined ? "visible" : "hidden"}>
              <ResultLibrary cards={libraryResults} setCards={setLibraryResults} />
            </Activity>
          </div>
        </Activity>
        <Activity mode={showSearchForm ? "visible" : "hidden"}>
          <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
            <LibrarySearchForm />
          </div>
          <div className={deck && addMode ? "hidden" : "hidden lg:flex lg:basis-1/12"} />
        </Activity>
      </FlexGapped>
      <Activity mode={showToggleAddMode ? "visible" : "hidden"}>
        <ButtonFloatDeckOrSearch addMode={addMode} toggleAddMode={toggleAddMode} />
      </Activity>
      <Activity mode={showFloatingButtons && showResultCol ? "visible" : "hidden"}>
        <ButtonFloatClose className="sm:hidden" handleClose={handleClear} />
        {isEditable && <ButtonFloatAdd className="sm:hidden" />}
      </Activity>
    </div>
  );
};

export default Library;
