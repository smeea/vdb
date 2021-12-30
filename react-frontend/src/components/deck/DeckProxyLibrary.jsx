import React from 'react';
import {
  DeckProxyLibraryTable,
  ResultLibraryType,
  ResultLibraryModal,
} from 'components';
import { useApp } from 'context';
import {
  countCards,
  isTriffle,
  resultLibrarySort,
  getTotalCardsGroupedBy,
  getCardsGroupedBy,
} from 'utils';
import { GROUPED_TYPE, TYPE, MASTER } from 'utils/constants';
import { useModalCardController } from 'hooks';

function DeckProxyLibrary(props) {
  const { cards, proxySelected, inAdvSelect, inDeckTab } = props;
  const { handleSetSelector, handleProxyCounter, handleProxySelector } = props;
  const { setShowFloatingButtons } = props;

  const { nativeLibrary, isMobile } = useApp();

  const sortedLibrary = resultLibrarySort(Object.values(cards), GROUPED_TYPE);

  const library = sortedLibrary.filter((card) => card.q > 0);
  const librarySide = sortedLibrary.filter((card) => card.q <= 0);

  const libraryByType = getCardsGroupedBy(library, TYPE);
  const librarySideByType = getCardsGroupedBy(librarySide, TYPE);

  const proxiesToPrint = Object.values(proxySelected).filter(
    (card) => card.print && card.q > 0
  );
  const libraryTotalSelected = countCards(proxiesToPrint);
  const libraryByTypeTotal = getTotalCardsGroupedBy(proxiesToPrint, TYPE);

  const trifleTotal = countCards(
    library.filter((card) => isTriffle(card.c, nativeLibrary))
  );

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(
    library.map((c) => c.c),
    librarySide.map((c) => c.c)
  );

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && setShowFloatingButtons(true);
  };

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype} className="pt-2">
      <div className="d-flex justify-content-between pe-2">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype == MASTER && trifleTotal}
          inAdvSelect={inAdvSelect}
        />
      </div>
      <DeckProxyLibraryTable
        handleModalCardOpen={handleModalCardOpen}
        cards={libraryByType[cardtype]}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
        setShowFloatingButtons={setShowFloatingButtons}
      />
    </div>
  ));

  const LibrarySideDeck = Object.keys(librarySideByType).map((cardtype) => (
    <div key={cardtype}>
      <ResultLibraryType
        cardtype={cardtype}
        total={0}
        trifleTotal={cardtype == MASTER && trifleTotal}
      />
      <DeckProxyLibraryTable
        handleModalCardOpen={handleModalSideCardOpen}
        cards={librarySideByType[cardtype]}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
        setShowFloatingButtons={setShowFloatingButtons}
      />
    </div>
  ));

  return (
    <>
      <div className={inDeckTab && !isMobile ? 'sticky-lib-indeck pt-4' : null}>
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
      {librarySide.length > 0 && !inAdvSelect && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {shouldShowModal && (
        <ResultLibraryModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default DeckProxyLibrary;
