import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import X from 'assets/images/icons/x.svg';
import {
  OverlayTooltip,
  DeckLibraryTable,
  DeckLibraryTotalInfo,
  DeckNewLibraryCard,
  ResultLibraryType,
  ResultLibraryModal,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
} from 'components';

import AppContext from 'context/AppContext.js';
import drawProbability from 'components/drawProbability.js';

function DeckLibrary(props) {
  const { nativeLibrary, isMobile } = useContext(AppContext);

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

  const library = {};
  const librarySide = {};
  const libraryCards = [];
  const librarySideCards = [];
  let hasBanned = false;

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
      if (props.cards[card].c['Banned']) {
        hasBanned = true;
      }
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
  let poolTotal = 0;
  let bloodTotal = 0;
  const libraryByType = {};
  const librarySideByType = {};
  const libraryByDisciplinesTotal = {};
  const libraryByClansTotal = {};

  Object.keys(library).map((card) => {
    if (!isNaN(library[card].c['Blood Cost'])) {
      bloodTotal += library[card].c['Blood Cost'] * library[card].q;
    }
    if (!isNaN(library[card].c['Pool Cost'])) {
      poolTotal += library[card].c['Pool Cost'] * library[card].q;
    }

    libraryTotal += library[card].q;

    const cardtype = library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }
    libraryByType[cardtype].push(library[card]);

    const disciplines = library[card].c['Discipline'];
    if (disciplines) {
      if (libraryByDisciplinesTotal[disciplines] === undefined) {
        libraryByDisciplinesTotal[disciplines] = 0;
      }
      libraryByDisciplinesTotal[disciplines] += library[card].q;
    }

    const clans = library[card].c['Clan'];
    if (clans && library[card].c['Type'] !== 'Master') {
      if (libraryByClansTotal[clans] === undefined) {
        libraryByClansTotal[clans] = 0;
      }
      libraryByClansTotal[clans] += library[card].q;
    }

    if (!disciplines && !clans && library[card].c['Type'] !== 'Master') {
      if (libraryByDisciplinesTotal['any'] === undefined) {
        libraryByDisciplinesTotal['any'] = 0;
      }
      libraryByDisciplinesTotal['any'] += library[card].q;
    }
  });

  Object.keys(librarySide).map((card) => {
    const cardtype = librarySide[card].c['Type'];
    if (librarySideByType[cardtype] === undefined) {
      librarySideByType[cardtype] = [];
    }
    librarySideByType[cardtype].push(librarySide[card]);
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
              inAdvSelect={props.inAdvSelect}
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
          <DeckLibraryTable
            handleModalCardOpen={handleModalCardOpen}
            libraryTotal={libraryTotal}
            showInfo={showInfo}
            deckid={props.deckid}
            cards={libraryByType[cardtype]}
            isAuthor={props.isAuthor}
            inSearch={props.inSearch}
            inMissing={props.inMissing}
            inAdvSelect={props.inAdvSelect}
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
          <DeckLibraryTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={props.deckid}
            cards={librarySideByType[cardtype]}
            isAuthor={props.isAuthor}
            inSearch={props.inSearch}
            inMissing={props.inMissing}
            inAdvSelect={props.inAdvSelect}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  });

  return (
    <>
      <div
        className={
          props.inDeckTab && !isMobile ? 'sticky-lib-indeck pt-4' : null
        }
      >
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
            {!props.inAdvSelect && (
              <>
                <Button
                  title="Additional Info"
                  variant="primary"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <InfoCircle />
                </Button>
                {props.isAuthor && !isMobile && (
                  <div className="ps-1">
                    <Button
                      title="Add Card"
                      variant="primary"
                      onClick={() => setShowAdd(!showAdd)}
                    >
                      +
                    </Button>
                  </div>
                )}
              </>
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
              cards={props.cards}
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
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowAdd(false)}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </Modal.Header>
              <Modal.Body className="p-0">
                <DeckNewLibraryCard
                  setShowAdd={setShowAdd}
                  cards={props.cards}
                  deckid={props.deckid}
                />
              </Modal.Body>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && !props.inAdvSelect && (
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

export default DeckLibrary;
