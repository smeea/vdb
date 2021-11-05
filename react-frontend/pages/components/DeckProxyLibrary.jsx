import React, { useState, useContext } from 'react';
import DeckProxyLibraryTable from './DeckProxyLibraryTable.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import AppContext from '../../context/AppContext.js';

function DeckProxyLibrary(props) {
  const { nativeLibrary, isMobile } = useContext(AppContext);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);

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
  let libraryTotalSelected = 0;

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
    } else {
      librarySide[card] = props.cards[card];
    }

    if (
      props.proxySelected[card] &&
      props.proxySelected[card].print &&
      props.proxySelected[card].q > 0
    ) {
      libraryTotalSelected += props.proxySelected[card].q;
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

  const libraryByType = {};
  const librarySideByType = {};

  Object.keys(library).map((card) => {
    const cardtype = library[card].c['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }
    libraryByType[cardtype].push(library[card]);
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
        libraryByTypeTotal[cardtype] +=
          props.proxySelected[card.c.Id] &&
          props.proxySelected[card.c.Id].print &&
          props.proxySelected[card.c.Id].q;
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
          </div>
          <DeckProxyLibraryTable
            handleModalCardOpen={handleModalCardOpen}
            cards={libraryByType[cardtype]}
            handleProxySelector={props.handleProxySelector}
            handleSetSelector={props.handleSetSelector}
            handleProxyCounter={props.handleProxyCounter}
            proxySelected={props.proxySelected}
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
          <DeckProxyLibraryTable
            handleModalCardOpen={handleModalSideCardOpen}
            cards={librarySideByType[cardtype]}
            handleProxySelector={props.handleProxySelector}
            handleSetSelector={props.handleSetSelector}
            handleProxyCounter={props.handleProxyCounter}
            proxySelected={props.proxySelected}
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
          <b>Library [{libraryTotalSelected}]</b>
        </div>
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && !props.inAdvSelect && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
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
    </>
  );
}

export default DeckProxyLibrary;
