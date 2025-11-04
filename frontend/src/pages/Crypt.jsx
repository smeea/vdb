import { Activity, useEffect } from "react";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  ButtonFloatAdd,
  ButtonFloatClose,
  ButtonFloatDeckOrSearch,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  FlexGapped,
  ResultCrypt,
} from "@/components";
import { CRYPT, CRYPT_COMPARE, DECK, DECKID, DECKS } from "@/constants";
import { deckStore, searchResults, setCryptResults, setDeck, useApp } from "@/context";

const Crypt = () => {
  const { addMode, toggleAddMode, isMobile, isDesktop, showFloatingButtons, lastDeckId } = useApp();
  const { [DECK]: deck, [DECKS]: decks } = useSnapshot(deckStore);
  const { [CRYPT]: cryptResults, [CRYPT_COMPARE]: cryptCompare } = useSnapshot(searchResults);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = JSON.parse(searchParams.get("q"));

  const showSearchForm =
    isDesktop ||
    (!isDesktop && !isMobile && !(addMode && cryptResults)) ||
    (isMobile && !cryptResults);
  const showToggleAddMode = deckStore[DECK] && cryptResults && !isMobile && !isDesktop;
  const showResultCol = !(isMobile && !cryptResults);

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
        <div
          className={twMerge(
            "max-sm:hidden",
            showSearchForm ? "lg:basis-1/12" : "sm:basis-5/12 lg:basis-6/12",
            deck && addMode ? "xl:basis-4/12" : "xl:basis-2/12",
          )}
        >
          <Activity
            mode={
              decks !== undefined && (isDesktop || (!isDesktop && !showSearchForm))
                ? "visible"
                : "hidden"
            }
          >
            <DeckSelectorAndDisplay />
          </Activity>
        </div>
        <Activity mode={showResultCol ? "visible" : "hidden"}>
          <div className="basis-full sm:basis-7/12 lg:basis-6/12 xl:basis-5/12">
            <Activity
              mode={
                (isMobile && cryptCompare && cryptResults) || (!isMobile && cryptCompare)
                  ? "visible"
                  : "hidden"
              }
            >
              <div>
                <ResultCrypt cards={cryptCompare} inCompare />
              </div>
            </Activity>
            <Activity mode={cryptResults !== undefined ? "visible" : "hidden"}>
              <ResultCrypt cards={cryptResults} />
            </Activity>
          </div>
        </Activity>
        <Activity mode={showSearchForm ? "visible" : "hidden"}>
          <div className="basis-full max-sm:p-2 sm:basis-5/12 lg:basis-4/12 xl:basis-3/12">
            <CryptSearchForm />
          </div>
          <div className={deck && addMode ? "hidden" : "hidden lg:flex lg:basis-1/12"} />
        </Activity>
      </FlexGapped>
      <Activity mode={showToggleAddMode ? "visible" : "hidden"}>
        <ButtonFloatDeckOrSearch addMode={addMode} toggleAddMode={toggleAddMode} />
      </Activity>
      <Activity mode={showFloatingButtons && showResultCol ? "visible" : "hidden"}>
        <ButtonFloatClose className="sm:hidden" handleClose={handleClear} />
        <ButtonFloatAdd className="sm:hidden" />
      </Activity>
    </div>
  );
};

export default Crypt;
