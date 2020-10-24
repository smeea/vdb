import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AlertMessage from './components/AlertMessage.jsx';
import ResultCrypt from './components/ResultCrypt.jsx';
import SearchCryptForm from './components/SearchCryptForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelect from './components/DeckSelect.jsx';

function Crypt(props) {
  const [results, setResults] = useState(undefined);
  const [sortMethod, setSortMethod] = useState('Default');

  return (
    <Container className="main-container px-0">
      <Row>
        <Col md={12} lg={3}>
          {Object.keys(props.decks).length > 0 && (
            <DeckSelect
              preview={true}
              decks={props.decks}
              activeDeck={props.activeDeck}
              setActiveDeck={props.setActiveDeck}
            />
          )}
          {props.activeDeck && (
            <DeckPreview
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deck={props.decks[props.activeDeck]}
              getDecks={props.getDecks}
              deckCardChange={props.deckCardChange}
            />
          )}
        </Col>
        <Col md={12} lg={6}>
          {results != undefined && results != null && (
            <ResultCrypt
              showImage={props.showImage}
              toggleImage={props.toggleImage}
              deckCardAdd={props.deckCardAdd}
              cards={results}
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
        <Col md={12} lg={3}>
          <SearchCryptForm setResults={setResults} />
        </Col>
      </Row>
    </Container>
  );
}

export default Crypt;
