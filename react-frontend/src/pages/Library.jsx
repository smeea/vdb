import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import { useApp } from 'context';

function Library(props) {
  const {
    deckRouter,
    showLibrarySearch,
    libraryResults,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
  } = useApp();

  const deckData = deckRouter(props.activeDeck);

  const deckId = props.activeDeck.deckid;

  const showSearchForm = useMemo(() => {
    return (
      isDesktop || (!isMobile && !addMode) || (showLibrarySearch && isMobile)
    );
  }, [isMobile, isDesktop, addMode, showLibrarySearch]);

  const showToggleAddMode = useMemo(() => {
    return deckId && (libraryResults || addMode) && !isMobile && !isDesktop;
  }, [isMobile, isDesktop, addMode, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && showLibrarySearch));

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={addMode ? 5 : 1}
            lg={addMode ? 6 : 1}
            xl={deckId && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 py-md-3"
          >
            <DeckSelectorAndDisplay
              deckData={deckData}
              activeDeck={props.activeDeck}
            />
          </Col>
        )}

        {showResultCol && (
          <Col md={7} lg={6} xl={5} className={'px-0 px-md-2 px-xl-3 py-md-3'}>
            {libraryResults && (
              <ResultLibrary
                library={deckData && deckData.library}
                activeDeck={props.activeDeck}
              />
            )}
          </Col>
        )}
        {showSearchForm && (
          <Col md={4} lg={4} xl={3} className={'p-1 px-md-2 pe-xl-0 py-md-3'}>
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
}

export default Library;
