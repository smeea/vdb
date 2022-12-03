import React, { useMemo, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import {
  useApp,
  searchResults,
  setCryptResults,
  setCryptCompare,
  setDeck,
  deckStore,
} from 'context';

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
    <div className="search-container mx-auto px-md-2 px-xl-4">
      <div className="flex flex-row">
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 0}
            lg={!showSearchForm ? 6 : 1}
            xl={deck && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0"
          >
            {decks !== undefined &&
              (isDesktop || (!isDesktop && !showSearchForm)) && (
                <DeckSelectorAndDisplay />
              )}
          </Col>
        )}
        {showResultCol && (
          <Col
            md={7}
            lg={6}
            xl={deck && addMode ? 5 : 6}
            xxl={5}
            className="px-0 px-md-2 py-md-3 px-xl-3"
          >
            {((isMobile && cryptCompare && cryptResults) ||
              (!isMobile && cryptCompare)) && (
              <div className="pb-3">
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
          </Col>
        )}
        {showSearchForm && (
          <Col
            md={5}
            xl={deck && addMode ? 3 : 4}
            xxl={3}
            className="p-1 px-md-2 py-md-3 pe-xl-0"
          >
            <CryptSearchForm />
          </Col>
        )}
      </div>
      {showToggleAddMode && (
        <ToogleSearchAddButton
          addMode={addMode}
          toggleAddMode={toggleAddMode}
        />
      )}
    </div>
  );
};

export default Crypt;
