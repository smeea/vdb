import React from 'react';
import {
  DeckProxyLibraryTable,
  ResultLibraryType,
  ResultModal,
} from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { MASTER } from 'utils/constants';
import { useModalCardController, useDeckLibrary } from 'hooks';

const DeckProxyLibrary = ({
  cards,
  proxySelected,
  handleSetSelector,
  handleProxyCounter,
  handleProxySelector,
}) => {
  const { isMobile, setShowFloatingButtons } = useApp();

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(cards);

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) =>
        cardid < 200000 &&
        proxySelected[cardid].print &&
        proxySelected[cardid].q > 0
    )
    .map((cardid) => proxySelected[cardid]);

  const libraryTotalSelected = countCards(proxiesToPrint);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype}>
      <div className="flex justify-between ">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype == MASTER && trifleTotal}
        />
      </div>
      <DeckProxyLibraryTable
        handleModalCardOpen={handleModalCardOpen}
        cards={libraryByType[cardtype]}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
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
      />
    </div>
  ));

  return (
    <>
      <div className="flex items-center justify-between bg-bgSecondary font-bold dark:bg-bgSecondaryDark">
        Library [{libraryTotalSelected}]
      </div>
      {LibraryDeck}
      {librarySide.length > 0 && (
        <div className=" opacity-60">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
          nested={true}
        />
      )}
    </>
  );
};

export default DeckProxyLibrary;
