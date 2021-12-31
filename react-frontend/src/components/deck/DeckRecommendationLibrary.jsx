import React, { useState } from 'react';
import {
  ResultLibraryType,
  DeckRecommendationLibraryTable,
  ResultLibraryModal,
} from 'components';
import { useApp } from 'context';
import { cardtypeSorted } from 'utils/constants';

function DeckRecommendationLibrary(props) {
  const { isMobile } = useApp();

  // const [LibraryByTypeTable, setLibraryByTypeTable] = useState([]);
  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);

  const handleModalCardOpen = (i) => {
    setModalCardIdx(libraryCards.indexOf(i));
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
  const libraryCards = [];

  props.cards.map((card) => {
    library[card.Id] = card;
  });

  const libraryByType = {};

  Object.keys(library).map((card) => {
    const cardtype = library[card]['Type'];
    if (libraryByType[cardtype] === undefined) {
      libraryByType[cardtype] = [];
    }
    libraryByType[cardtype].push(library[card]);
  });

  const LibraryDeck = [];

  cardtypeSorted.map((cardtype) => {
    if (libraryByType[cardtype] !== undefined) {
      Object.values(libraryByType[cardtype]).map((card) => {
        libraryCards.push(card);
      });
      LibraryDeck.push(
        <div key={cardtype} className="pt-2">
          <div className="d-flex justify-content-between pe-2">
            <ResultLibraryType cardtype={cardtype} total={0} />
          </div>
          <DeckRecommendationLibraryTable
            className="deck-library-table"
            handleModalCardOpen={handleModalCardOpen}
            activeDeck={props.activeDeck}
            library={props.activeDeck.library}
            cards={libraryByType[cardtype]}
            isAuthor={props.isAuthor}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  });

  return (
    <>
      {LibraryDeck}
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={libraryCards[modalCardIdx]}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
        />
      )}
    </>
  );
}

export default DeckRecommendationLibrary;
