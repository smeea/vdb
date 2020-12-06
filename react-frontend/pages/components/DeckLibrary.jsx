import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import DeckLibraryTable from './DeckLibraryTable.jsx';
import DeckLibraryTotalByTypes from './DeckLibraryTotalByTypes.jsx';
import DeckNewLibraryCard from './DeckNewLibraryCard.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function DeckLibraryByTypeTable(props) {
  return (
    <>
      <ResultLibraryType cardtype={props.cardtype} total={props.total} />
      <DeckLibraryTable
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        deckid={props.deckid}
        deckCardChange={props.deckCardChange}
        cards={props.cards}
        isAuthor={props.isAuthor}
        isMobile={props.isMobile}
        proxySelector={props.proxySelector}
        proxyCounter={props.proxyCounter}
        proxySelected={props.proxySelected}
      />
    </>
  );
}

function DeckLibrary(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  const library = {};
  const librarySide = {};

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
    } else {
      librarySide[card] = props.cards[card];
    }
  });

  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  let libraryTotal = 0;
  const libraryByType = {};
  const librarySideByType = {};

  for (const card in library) {
    if (card) {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (libraryByType[cardtype] === undefined) {
        libraryByType[cardtype] = [];
      }
      libraryByType[cardtype].push(library[card]);
    }
  }

  for (const card in librarySide) {
    if (card) {
      const cardtype = librarySide[card].c['Type'];
      if (librarySideByType[cardtype] === undefined) {
        librarySideByType[cardtype] = [];
      }
      librarySideByType[cardtype].push(librarySide[card]);
    }
  }

  const libraryByTypeTotal = {};
  const LibraryDeck = [];
  const LibrarySideDeck = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByTypeTotal[cardtype] = 0;
      let total = 0;
      for (const card of libraryByType[cardtype]) {
        total += card.q;
        libraryByTypeTotal[cardtype] += card.q;
      }
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={libraryByType[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
          />
        </div>
      );
    }

    if (librarySideByType[cardtype] !== undefined) {
      let total = 0;
      for (const card of librarySideByType[cardtype]) {
        total += card.q;
      }
      LibrarySideDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={librarySideByType[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
          />
        </div>
      );
    }
  }

  return (
    <div className="pt-4">
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>Library [{libraryTotal}]</b>
        <div>
          <Button
            variant="outline-secondary"
            onClick={() => setShowTotal(!showTotal)}
          >
            <InfoCircle />
          </Button>
          {props.isAuthor && (
            <Button
              variant="outline-secondary"
              onClick={() => setShowAdd(!showAdd)}
            >
              +
            </Button>
          )}
        </div>
      </div>
      {showTotal && (
        <div className="info-message pl-2">
          <DeckLibraryTotalByTypes byTypes={libraryByTypeTotal} />
        </div>
      )}
      {showAdd &&
        (!props.isMobile ? (
          <DeckNewLibraryCard
            deckCardAdd={props.deckCardAdd}
            setShowAdd={setShowAdd}
            cards={props.cards}
          />
        ) : (
          <Modal
            show={showAdd}
            onHide={() => setShowAdd(false)}
            animation={false}
          >
            <Modal.Body className="p-0">
              <Container className="p-0" fluid>
                <Row className="p-0 m-0">
                  <Col className="p-0">
                    <div className="m-2">
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowAdd(false)}
                      >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h5>Add Library Card</h5>
                    </div>
                  </Col>
                </Row>
                <DeckNewLibraryCard
                  deckCardAdd={props.deckCardAdd}
                  setShowAdd={setShowAdd}
                />
              </Container>
            </Modal.Body>
          </Modal>
        ))}
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
    </div>
  );
}

export default DeckLibrary;
