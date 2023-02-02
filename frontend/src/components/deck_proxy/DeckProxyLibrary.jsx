import React from 'react';
import {
  DeckProxyLibraryTable,
  ResultLibraryType,
  ResultModal,
} from '@/components';
import { useApp } from '@/context';
import { countCards } from '@/utils';
import { MASTER } from '@/utils/constants';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const DeckProxyLibrary = ({
  deck,
  proxySelected,
  handleSetSelector,
  handleProxyCounter,
  handleProxySelector,
}) => {
  const { setShowFloatingButtons } = useApp();

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    trifleTotal,
    libraryByTypeTotal,
  } = useDeckLibrary(deck.library);

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
        inventoryType={deck.inventoryType}
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
        inventoryType={deck.inventoryType}
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
      <div className="flex min-h-[38px] items-center justify-between bg-bgSecondary px-2 font-bold dark:bg-bgSecondaryDark">
        Library [{libraryTotalSelected}]
      </div>
      {LibraryDeck}
      {librarySide.length > 0 && (
        <div className=" opacity-60 dark:opacity-50">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
          bordered
        />
      )}
    </>
  );
};

export default DeckProxyLibrary;
