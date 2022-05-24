import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import { useApp, useSearchResults } from 'context';

const Library = ({ lastDeckId }) => {
  const {
    deckRouter,
    showLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    activeDeck,
  } = useApp();

  const {
    libraryResults,
    setLibraryResults,
    libraryCompare,
    setLibraryCompare,
  } = useSearchResults();

  let myActiveDeck;
  if (isMobile) {
    myActiveDeck = activeDeck;
  } else {
    myActiveDeck = {
      src: 'my',
      deckid: activeDeck.src == 'my' ? activeDeck.deckid : lastDeckId,
    };
  }

  const deckData = deckRouter(myActiveDeck);
  const deckid = myActiveDeck.deckid;

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && showLibrarySearch)
    );
  }, [isMobile, isDesktop, addMode, showLibrarySearch, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deckid && libraryResults && !isMobile && !isDesktop;
  }, [deckid, isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && showLibrarySearch));

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 1}
            lg={!showSearchForm ? 6 : 1}
            xl={deckid && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 pb-md-3"
          >
            {deckData && (isDesktop || (!isDesktop && !showSearchForm)) && (
              <DeckSelectorAndDisplay deckData={deckData} />
            )}
          </Col>
        )}
        {showResultCol && (
          <Col md={7} lg={6} xl={5} className="px-0 px-md-2 px-xl-3 py-md-3">
            {((isMobile && libraryCompare && libraryResults) ||
              (!isMobile && libraryCompare)) && (
              <div className="pb-3">
                <ResultLibrary
                  inCompare={true}
                  cards={libraryCompare}
                  setCards={setLibraryCompare}
                  library={deckData && deckData.library}
                  activeDeck={myActiveDeck}
                />
              </div>
            )}
            {libraryResults !== undefined && (
              <ResultLibrary
                cards={libraryResults}
                setCards={setLibraryResults}
                library={deckData && deckData.library}
                activeDeck={myActiveDeck}
              />
            )}
          </Col>
        )}
        {showSearchForm && (
          <Col md={4} lg={4} xl={3} className="p-1 p-md-3 pe-xl-0">
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
