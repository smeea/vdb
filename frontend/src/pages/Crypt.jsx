import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import { useApp, useSearchResults, searchResults } from 'context';

const Crypt = () => {
  const { showCryptSearch, addMode, toggleAddMode, isMobile, isDesktop, deck } =
    useApp();

  const { cryptCompare, setCryptCompare } = useSearchResults();

  const cryptResults = useSnapshot(searchResults).crypt;

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

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 1}
            lg={!showSearchForm ? 6 : 1}
            xl={deck && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 pb-md-3"
          >
            {deck && (isDesktop || (!isDesktop && !showSearchForm)) && (
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
                  inCompare={true}
                  cards={cryptCompare}
                  setCards={setCryptCompare}
                  isAuthor={deck.isAuthor}
                />
              </div>
            )}
            {cryptResults !== undefined && <ResultCrypt cards={cryptResults} />}
          </Col>
        )}
        {showSearchForm && (
          <Col
            md={4}
            xl={deck && addMode ? 3 : 4}
            xxl={3}
            className="p-1 p-md-3 pe-xl-0"
          >
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
};

export default Crypt;
