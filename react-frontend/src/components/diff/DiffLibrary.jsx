import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import X from 'assets/images/icons/x.svg';
import {
  OverlayTooltip,
  DiffLibraryTable,
  ResultLibraryType,
  ResultLibraryModal,
  DeckLibraryTotalInfo,
  DeckNewLibraryCard,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
} from 'components';

import { useApp } from 'context';
import drawProbability from 'components/drawProbability.js';

function DiffLibrary(props) {
  const { nativeLibrary, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);
  const [modalDraw, setModalDraw] = useState(undefined);

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
      }
    } else {
      const maxIdx = librarySideCards.length - 1;

      if (modalSideCardIdx + d < 0) {
        setModalSideCardIdx(maxIdx);
      } else if (modalSideCardIdx + d > maxIdx) {
        setModalSideCardIdx(0);
      } else {
        setModalSideCardIdx(modalSideCardIdx + d);
      }
    }
  };

  const libraryFrom = {};
  const libraryFromSide = {};
  const libraryTo = {};
  const libraryToSide = {};
  const libraryCards = [];
  const librarySideCards = [];
  let hasBanned = false;

  Object.keys(props.cardsFrom).map((card, index) => {
    if (props.cardsFrom[card].q > 0) {
      libraryFrom[card] = props.cardsFrom[card];
      if (props.cardsFrom[card].c['Banned']) {
        hasBanned = true;
      }
    } else {
      libraryFromSide[card] = props.cardsFrom[card];
    }
  });

  Object.keys(props.cardsTo).map((card, index) => {
    if (props.cardsTo[card].q > 0) {
      libraryTo[card] = props.cardsTo[card];
    } else {
      libraryToSide[card] = props.cardsTo[card];
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
  let poolTotal = 0;
  let bloodTotal = 0;
  const libraryByType = {};
  const librarySideByType = {};
  const libraryByDisciplinesTotal = {};
  const libraryByClansTotal = {};

  Object.keys(libraryFrom).map((card) => {
    if (!isNaN(libraryFrom[card].c['Blood Cost'])) {
      bloodTotal += libraryFrom[card].c['Blood Cost'] * libraryFrom[card].q;
    }
    if (!isNaN(libraryFrom[card].c['Pool Cost'])) {
      poolTotal += libraryFrom[card].c['Pool Cost'] * libraryFrom[card].q;
    }

    libraryTotal += libraryFrom[card].q;

    const cardtype = libraryFrom[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }
    libraryByType[cardtype].push(libraryFrom[card]);

    const disciplines = libraryFrom[card].c['Discipline'];
    if (disciplines) {
      if (libraryByDisciplinesTotal[disciplines] === undefined) {
        libraryByDisciplinesTotal[disciplines] = 0;
      }
      libraryByDisciplinesTotal[disciplines] += libraryFrom[card].q;
    }

    const clans = libraryFrom[card].c['Clan'];
    if (clans && libraryFrom[card].c['Type'] !== 'Master') {
      if (libraryByClansTotal[clans] === undefined) {
        libraryByClansTotal[clans] = 0;
      }
      libraryByClansTotal[clans] += libraryFrom[card].q;
    }

    if (!disciplines && !clans && libraryFrom[card].c['Type'] !== 'Master') {
      if (libraryByDisciplinesTotal['any'] === undefined) {
        libraryByDisciplinesTotal['any'] = 0;
      }
      libraryByDisciplinesTotal['any'] += libraryFrom[card].q;
    }
  });

  Object.keys(libraryFromSide).map((card) => {
    if (!libraryTo[card]) {
      const cardtype = libraryFromSide[card].c['Type'];
      if (librarySideByType[cardtype] === undefined) {
        librarySideByType[cardtype] = [];
      }
      librarySideByType[cardtype].push(libraryFromSide[card]);
    }
  });

  Object.keys(libraryTo).map((card) => {
    if (!libraryFrom[card]) {
      const cardtype = libraryTo[card].c['Type'];
      if (libraryByType[cardtype] === undefined) {
        libraryByType[cardtype] = [];
      }
      libraryByType[cardtype].push({ q: 0, c: libraryTo[card].c });
    }
  });

  Object.keys(libraryToSide).map((card) => {
    if (!libraryFrom[card] && !libraryFromSide[card]) {
      const cardtype = libraryToSide[card].c['Type'];
      if (librarySideByType[cardtype] === undefined) {
        librarySideByType[cardtype] = [];
      }
      librarySideByType[cardtype].push({ q: 0, c: libraryToSide[card].c });
    }
  });

  const libraryByTypeTotal = {};
  let trifleTotal = 0;
  const LibraryDeck = [];
  const LibrarySideDeck = [];

  cardtypeSorted.map((cardtype) => {
    if (libraryByType[cardtype] !== undefined) {
      libraryByTypeTotal[cardtype] = 0;
      Object.values(libraryByType[cardtype]).map((card) => {
        libraryCards.push(card.c);
        libraryByTypeTotal[cardtype] += card.q;
        if (
          cardtype == 'Master' &&
          nativeLibrary[card.c.Id]['Card Text'].toLowerCase().includes('trifle')
        ) {
          trifleTotal += card.q;
        }
      });
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <div className="d-flex justify-content-between pe-2">
            <ResultLibraryType
              cardtype={cardtype}
              total={libraryByTypeTotal[cardtype]}
              trifleTotal={cardtype == 'Master' && trifleTotal}
            />
            {showInfo && (
              <>
                {isMobile ? (
                  <div
                    onClick={() =>
                      setModalDraw({
                        name: cardtype,
                        prob: (
                          <DeckDrawProbabilityText
                            N={libraryTotal}
                            n={7}
                            k={libraryByTypeTotal[cardtype]}
                          />
                        ),
                      })
                    }
                  >
                    {`${Math.floor(
                      drawProbability(
                        1,
                        libraryTotal,
                        7,
                        libraryByTypeTotal[cardtype]
                      ) * 100
                    )}%`}
                  </div>
                ) : (
                  <OverlayTooltip
                    placement="right"
                    text={
                      <DeckDrawProbabilityText
                        N={libraryTotal}
                        n={7}
                        k={libraryByTypeTotal[cardtype]}
                      />
                    }
                  >
                    <div className="d-inline">{`${Math.floor(
                      drawProbability(
                        1,
                        libraryTotal,
                        7,
                        libraryByTypeTotal[cardtype]
                      ) * 100
                    )}%`}</div>
                  </OverlayTooltip>
                )}
              </>
            )}
          </div>
          <DiffLibraryTable
            handleModalCardOpen={handleModalCardOpen}
            libraryTotal={libraryTotal}
            showInfo={showInfo}
            deckid={props.deckid}
            cards={libraryByType[cardtype]}
            cardsFrom={props.cardsFrom}
            cardsTo={props.cardsTo}
            isAuthor={props.isAuthor}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }

    if (librarySideByType[cardtype] !== undefined) {
      Object.values(librarySideByType[cardtype]).map((card) => {
        librarySideCards.push(card.c);
      });

      LibrarySideDeck.push(
        <div key={cardtype}>
          <ResultLibraryType
            cardtype={cardtype}
            total={0}
            trifleTotal={cardtype == 'Master' && trifleTotal}
          />
          <DiffLibraryTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={props.deckid}
            cards={librarySideByType[cardtype]}
            cardsFrom={props.cardsFrom}
            cardsTo={props.cardsTo}
            isAuthor={props.isAuthor}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  });

  return (
    <>
      <div className={isMobile ? null : 'sticky-lib-indeck pt-4 pt-md-0'}>
        <div
          className={
            isMobile
              ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
              : 'd-flex align-items-center justify-content-between ps-2 info-message'
          }
        >
          <b>
            Library [{libraryTotal}
            {!props.inMissing &&
              (libraryTotal < 60 || libraryTotal > 90) &&
              ' of 60-90'}
            ]{!props.inMissing && hasBanned && ' - WITH BANNED'}
          </b>
          <div className="d-flex">
            {!props.inMissing && (
              <>
                <div
                  className="d-flex align-items-center pe-3"
                  title="Total Blood Cost"
                >
                  <img
                    className="cost-blood-image-results pb-1 pe-1"
                    src={process.env.ROOT_URL + 'images/misc/bloodX.png'}
                  />
                  <b>{bloodTotal}</b>
                </div>
                <div
                  className="d-flex align-items-center pe-3"
                  title="Total Pool Cost"
                >
                  <img
                    className="cost-pool-image-results py-1 pe-1"
                    src={process.env.ROOT_URL + 'images/misc/poolX.png'}
                  />
                  <b>{poolTotal}</b>
                </div>
              </>
            )}
            <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>
              <InfoCircle />
            </Button>
            {props.isAuthor && !isMobile && (
              <div className="ps-1">
                <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
        {showInfo && (
          <div className="info-message ps-2">
            <DeckLibraryTotalInfo
              byDisciplines={libraryByDisciplinesTotal}
              byTypes={libraryByTypeTotal}
              byClans={libraryByClansTotal}
            />
          </div>
        )}
        {showAdd &&
          (!isMobile ? (
            <DeckNewLibraryCard
              setShowAdd={setShowAdd}
              cards={props.cardsFrom}
              deckid={props.deckid}
            />
          ) : (
            <Modal
              show={showAdd}
              onHide={() => setShowAdd(false)}
              animation={false}
            >
              <Modal.Header
                className={isMobile ? 'pt-3 pb-1 ps-3 pe-2' : 'pt-3 pb-1 px-4'}
              >
                <h5>Add Library Card</h5>
                <Button variant="outline-secondary" onClick={props.handleClose}>
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </Modal.Header>
              <Modal.Body className="p-0">
                <DeckNewLibraryCard
                  setShowAdd={setShowAdd}
                  cards={props.cardsFrom}
                  deckid={props.deckid}
                />
              </Modal.Body>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {Object.keys(libraryFromSide).length > 0 && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && props.isAuthor && props.showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
        >
          <div className="d-inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
            L
          </div>
        </div>
      )}
      {(modalCardIdx !== undefined || modalSideCardIdx !== undefined) && (
        <ResultLibraryModal
          card={
            modalCardIdx !== undefined
              ? libraryCards[modalCardIdx]
              : librarySideCards[modalSideCardIdx]
          }
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            setModalSideCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
        />
      )}
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
}

export default DiffLibrary;
