import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import { useApp, useSearchResults } from 'context';

function Crypt({ lastDeckId }) {
  const {
    deckRouter,
    showCryptSearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    activeDeck,
  } = useApp();

  const { cryptResults } = useSearchResults();

  const myActiveDeck = {
    src: 'my',
    deckid: activeDeck.src == 'my' ? activeDeck.deckid : lastDeckId,
  };

  const deckData = deckRouter(myActiveDeck);

  const deckId = myActiveDeck.deckid;

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isMobile && (!addMode || !cryptResults)) ||
      (showCryptSearch && isMobile)
    );
  }, [isMobile, isDesktop, addMode, showCryptSearch]);

  const showToggleAddMode = useMemo(() => {
    return deckId && cryptResults && !isMobile && !isDesktop;
  }, [deckId, isMobile, isDesktop, cryptResults]);

  const showResultCol = useMemo(() => !(isMobile && showCryptSearch));

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 1}
            lg={addMode ? 6 : 1}
            xl={deckId && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 pb-md-3"
          >
            {deckData && (isDesktop || (!isDesktop && !showSearchForm)) && (
              <DeckSelectorAndDisplay deckData={deckData} />
            )}
          </Col>
        )}
        {showResultCol && (
          <Col md={7} lg={6} xl={5} className={'px-0 px-md-2 px-xl-3 py-md-3'}>
            {cryptResults && (
              <ResultCrypt
                crypt={deckData && deckData.crypt}
                activeDeck={myActiveDeck}
              />
            )}
          </Col>
        )}
        {showSearchForm && (
          <Col md={4} lg={4} xl={3} className={'p-1 px-md-2 pe-xl-0 py-md-3'}>
            <CryptSearchForm />
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

export default Crypt;
