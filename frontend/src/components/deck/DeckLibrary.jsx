import React, { useState } from 'react';
import {
  DeckLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbability,
  DeckLibraryHeader,
} from '@/components';
import { useApp } from '@/context';
import { MASTER } from '@/utils/constants';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const DeckLibrary = ({ deck, inSearch, inMissing }) => {
  const { isMobile, isNarrow } = useApp();
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const [showInfo, setShowInfo] = useState(false);

  const {
    library,
    librarySide,
    libraryByType,
    librarySideByType,
    hasBanned,
    trifleTotal,
    libraryTotal,
    poolTotal,
    bloodTotal,
    libraryByTypeTotal,
    libraryByClansTotal,
    libraryByDisciplinesTotal,
  } = useDeckLibrary(deck.library);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(library, librarySide);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClickSide = (card) => {
    handleModalSideCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype}>
      <div className="flex justify-between">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype === MASTER && trifleTotal}
        />
        {showInfo && (
          <DeckDrawProbability
            cardName={cardtype}
            N={libraryTotal}
            n={7}
            k={libraryByTypeTotal[cardtype]}
          />
        )}
      </div>
      <DeckLibraryTable
        deck={deck}
        handleClick={handleClick}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        cards={libraryByType[cardtype]}
        inMissing={inMissing}
      />
    </div>
  ));

  const LibrarySideDeck = Object.keys(librarySideByType).map((cardtype) => (
    <div key={cardtype}>
      <ResultLibraryType
        cardtype={cardtype}
        total={0}
        trifleTotal={cardtype === MASTER && trifleTotal}
      />
      <DeckLibraryTable
        deck={deck}
        handleClick={handleClickSide}
        cards={librarySideByType[cardtype]}
        inMissing={inMissing}
        placement={isNarrow ? 'bottom' : 'right'}
      />
    </div>
  ));

  return (
    <div className="flex flex-col sm:gap-4 lg:gap-6 xl:gap-8">
      <div className="space-y-2">
        <div
          className={
            !inMissing && !inSearch && !isMobile
              ? 'sticky z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[56px] lg:top-[64px] xl:top-[72px]'
              : ''
          }
        >
          <DeckLibraryHeader
            libraryTotal={libraryTotal}
            inMissing={inMissing}
            bloodTotal={bloodTotal}
            poolTotal={poolTotal}
            hasBanned={hasBanned}
            isEditable={isEditable}
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            cards={library}
            deckid={deckid}
            byTypes={libraryByTypeTotal}
            byClan={libraryByClansTotal}
            byDisciplines={libraryByDisciplinesTotal}
          />
        </div>
        <div className="space-y-2">{LibraryDeck}</div>
      </div>
      {librarySide.length > 0 && (
        <div className="space-y-2 opacity-60 dark:opacity-50">
          <div className="flex h-[42px] items-center bg-bgSecondary px-2 py-1 font-bold dark:bg-bgSecondaryDark">
            Side Library
          </div>
          <div className="space-y-2">{LibrarySideDeck}</div>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default DeckLibrary;
