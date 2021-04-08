import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import X from '../../assets/images/icons/x.svg';
import DeckLibraryTable from './DeckLibraryTable.jsx';
import DeckLibraryTotalByTypes from './DeckLibraryTotalByTypes.jsx';
import DeckNewLibraryCard from './DeckNewLibraryCard.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';

function DeckLibrary(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const handleModalCardOpen = (i) => {
    setModalCardIdx(libraryCards.indexOf(i));
  };

  const handleModalSideCardOpen = (i) => {
    setModalSideCardIdx(librarySideCards.indexOf(i));
  };

  const handleModalCardChange = (d) => {
    if (modalCardIdx !== undefined) {
      const maxIdx = libraryCards.length - 1;

      if (modalCardIdx + d < 0) {
        setModalCardIdx(maxIdx);
      } else if (modalCardIdx + d > maxIdx) {
        setModalCardIdx(0);
      } else {
        setModalCardIdx(modalCardIdx + d);
      };
    } else {
      const maxIdx = librarySideCards.length - 1;

      if (modalSideCardIdx + d < 0) {
        setModalSideCardIdx(maxIdx);
      } else if (modalSideCardIdx + d > maxIdx) {
        setModalSideCardIdx(0);
      } else {
        setModalSideCardIdx(modalSideCardIdx + d);
      };
    };
  };

  const library = {};
  const librarySide = {};
  const libraryCards = [];
  const librarySideCards = [];

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
  let trifleTotal = 0;
  const LibraryDeck = [];
  const LibrarySideDeck = [];

  for (const cardtype of cardtypeSorted) {
    if (libraryByType[cardtype] !== undefined) {
      libraryByTypeTotal[cardtype] = 0;
      for (const card of libraryByType[cardtype]) {
        libraryCards.push(card.c);
        libraryByTypeTotal[cardtype] += card.q;
        if (
          cardtype == 'Master' &&
          card.c['Card Text'].toLowerCase().includes('trifle')
        ) {
          trifleTotal += card.q;
        }
      }
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <ResultLibraryType
            cardtype={cardtype}
            total={libraryByTypeTotal[cardtype]}
            trifleTotal={cardtype == 'Master' && trifleTotal}
          />
          <DeckLibraryTable
            handleModalCardOpen={handleModalCardOpen}
            setModalInventory={setModalInventory}
            libraryTotal={libraryTotal}
            showInfo={showInfo}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckid={props.deckid}
            cardChange={props.cardChange}
            cards={libraryByType[cardtype]}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
            inventoryLibrary={props.inventoryLibrary}
            inventoryMode={props.inventoryMode}
            usedCards={props.usedCards}
            decks={props.decks}
            deckUpdate={props.deckUpdate}
            inSearch={props.inSearch}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }

    if (librarySideByType[cardtype] !== undefined) {
      for (const card of librarySideByType[cardtype]) {
        librarySideCards.push(card.c)
      }

      LibrarySideDeck.push(
        <div key={cardtype}>
          <ResultLibraryType
            cardtype={cardtype}
            total={0}
            trifleTotal={cardtype == 'Master' && trifleTotal}
          />
          <DeckLibraryTable
            handleModalCardOpen={handleModalSideCardOpen}
            setModalInventory={setModalInventory}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            deckid={props.deckid}
            cardChange={props.cardChange}
            cards={librarySideByType[cardtype]}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
            inventoryLibrary={props.inventoryLibrary}
            inventoryMode={props.inventoryMode}
            usedCards={props.usedCards}
            decks={props.decks}
            deckUpdate={props.deckUpdate}
            inSearch={props.inSearch}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>
          Library [{libraryTotal}
          {(libraryTotal < 60 || libraryTotal > 90) && ' of 60-90'}]
        </b>
        <div className="d-flex">
          <Button
            variant="outline-secondary"
            onClick={() => setShowInfo(!showInfo)}
          >
            <InfoCircle />
          </Button>
          {props.isAuthor && !props.isMobile && (
            <div className="lp-125">
              <Button
                variant="outline-secondary"
                onClick={() => setShowAdd(!showAdd)}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
      {showInfo && (
        <div className="info-message pl-2">
          <DeckLibraryTotalByTypes byTypes={libraryByTypeTotal} />
        </div>
      )}
      {showAdd &&
        (!props.isMobile ? (
          <DeckNewLibraryCard
            cardAdd={props.cardAdd}
            setShowAdd={setShowAdd}
            cards={props.cards}
            cardBase={props.cardBase}
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
                        className="close m-1"
                        onClick={() => setShowAdd(false)}
                      >
                        <X width="32" height="32" viewBox="0 0 16 16" />
                      </button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <h5>Add Library Card</h5>
                    </div>
                  </Col>
                </Row>
                <DeckNewLibraryCard
                  cardAdd={props.cardAdd}
                  setShowAdd={setShowAdd}
                  cards={props.cards}
                  cardBase={props.cardBase}
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
      {props.isMobile && props.showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="float-right-middle add"
        >
          <div className="d-flex py-0 px-1 align-items-top">
            <div className="d-inline" style={{ fontSize: '1.75em' }}>
              +
            </div>
            <div className="d-inline" style={{ fontSize: '1.8em' }}>
              L
            </div>
          </div>
        </div>
      )}
      {(modalCardIdx !== undefined || modalSideCardIdx !== undefined)&& (
        <ResultLibraryModal
          card={modalCardIdx !== undefined ? libraryCards[modalCardIdx] : librarySideCards[modalSideCardIdx]}
          handleModalCardChange={handleModalCardChange}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCardIdx(undefined);
            setModalSideCardIdx(undefined);
            props.isMobile && props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={props.inventoryMode}
        />
      )}
    </>
  );
}

export default DeckLibrary;
