import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AlertMessage from './components/AlertMessage.jsx';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShowCrypt from './components/DeckShowCrypt.jsx';
import DeckShowLibrary from './components/DeckShowLibrary.jsx';

function Crypt(props) {
  const [results, setResults] = useState(undefined);
  const [sortMethod, setSortMethod] = useState('Default');

  useEffect(() => {
   if (props.isMobile && results && results.length > 0) {
      props.setShowCols({
        result: true,
      });
    }
    if (props.isMobile && !results) {
      props.setShowCols({
        search: true,
      });
    }
  }, [results]);

  return (
    <Container className="main-container px-0">
      <Row>
        {props.showCols.deck && (
          <Col md={12} lg={3} xl={4}>
            {Object.keys(props.decks).length > 0 && (
              <DeckSelect
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
            )}
            {props.activeDeck && (
              props.isWide
                ? <>
                    <DeckShowCrypt
                      deckCardAdd={props.deckCardAdd}
                      deckCardChange={props.deckCardChange}
                      deckid={props.activeDeck}
                      cards={props.decks[props.activeDeck].crypt}
                      showImage={props.showImage}
                      toggleImage={props.toggleImage}
                      isAuthor={true}
                    />
                    <DeckShowLibrary
                      deckCardAdd={props.deckCardAdd}
                      deckCardChange={props.deckCardChange}
                      deckid={props.activeDeck}
                      cards={props.decks[props.activeDeck].library}
                      showImage={props.showImage}
                      toggleImage={props.toggleImage}
                      isAuthor={true}
                    />
                  </>
              : <DeckPreview
                  showImage={props.showImage}
                  toggleImage={props.toggleImage}
                  deck={props.decks[props.activeDeck]}
                  getDecks={props.getDecks}
                  deckCardChange={props.deckCardChange}
/>
            )}
          </Col>
        )}
        {props.showCols.result && (
          <Col md={12} lg={6} xl={4}>
            {results != undefined && results != null && (
              <ResultCrypt
                showImage={props.showImage}
                toggleImage={props.toggleImage}
                deckCardAdd={props.deckCardAdd}
                cards={results}
                crypt={(props.decks && props.decks[props.activeDeck]) && props.decks[props.activeDeck].crypt}
                activeDeck={props.activeDeck}
                showSort={true}
                showTotal={true}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
              />
            )}
            {results === null && (
              <AlertMessage className="error-message">
                <>
                  <div />
                  <b>NO CARDS FOUND</b>
                  <div />
                </>
              </AlertMessage>
            )}
          </Col>
        )}
        {props.showCols.search && (
          <>
            <Col md={12} lg={3} xl={3}>
              <SearchCryptForm setResults={setResults} />
            </Col>
            <Col md={0} lg={0 }xl={1}>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Crypt;
