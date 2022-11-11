import React, { useMemo, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import {
  useApp,
  searchResults,
  setLibraryResults,
  setLibraryCompare,
  setDeck,
  deckStore,
} from 'context';

const Library = () => {
  const {
    showLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    lastDeckId,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const libraryResults = useSnapshot(searchResults).library;
  const libraryCompare = useSnapshot(searchResults).libraryCompare;
  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && showLibrarySearch)
    );
  }, [isMobile, isDesktop, addMode, showLibrarySearch, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && libraryResults && !isMobile && !isDesktop;
  }, [deck, isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && showLibrarySearch));

  useEffect(() => {
    if (!deck && decks !== undefined && lastDeckId) {
      setDeck(decks[lastDeckId]);
    }
  }, [deck, decks, lastDeckId]);

  return (
    <Container className="search-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 1}
            lg={!showSearchForm ? 6 : 1}
            xl={deck && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 pb-md-3"
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
            {((isMobile && libraryCompare && libraryResults) ||
              (!isMobile && libraryCompare)) && (
              <div className="pb-3">
                <ResultLibrary
                  cards={libraryCompare}
                  setCards={setLibraryCompare}
                  isAuthor={deck?.isAuthor}
                  inCompare
                />
              </div>
            )}
            {libraryResults !== undefined && (
              <ResultLibrary
                cards={libraryResults}
                setCards={setLibraryResults}
                isAuthor={deck?.isAuthor}
              />
            )}
          </Col>
        )}
        {showSearchForm && (
          <Col
            md={4}
            xl={deck && addMode ? 3 : 4}
            xxl={3}
            className="p-1 px-md-2 py-md-3 pe-xl-0"
          >
            <LibrarySearchForm />
          </Col>
        )}
      </Row>
      {showToggleAddMode && (
        <ToogleSearchAddButton
          addMode={addMode}
          toggleAddMode={toggleAddMode}
        />
      )}
    </Container>
  );
};

export default Library;
