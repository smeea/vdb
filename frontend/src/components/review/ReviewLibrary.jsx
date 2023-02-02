import React, { useState } from 'react';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbability,
  DeckLibraryHeader,
  ButtonFloat,
} from '@/components';
import { MASTER } from '@/utils/constants';
import { useApp } from '@/context';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const ReviewLibrary = ({ cardChange, cardsFrom, cardsTo }) => {
  const { isMobile, showFloatingButtons, setShowFloatingButtons } = useApp();
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
  } = useDeckLibrary(cardsFrom, cardsTo);

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
      <DiffLibraryTable
        isEditable
        cardChange={cardChange}
        handleModalCardOpen={handleModalCardOpen}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        cards={libraryByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
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
      <DiffLibraryTable
        isAuthor
        cardChange={cardChange}
        handleModalCardOpen={handleModalSideCardOpen}
        cards={librarySideByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
      />
    </div>
  ));

  return (
    <>
      <div
        className={
          isMobile ? null : 'top-[32px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
        }
      >
        <DeckLibraryHeader
          libraryTotal={libraryTotal}
          bloodTotal={bloodTotal}
          poolTotal={poolTotal}
          hasBanned={hasBanned}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          cards={library}
          byTypes={libraryByTypeTotal}
          byClan={libraryByClansTotal}
          byDisciplines={libraryByDisciplinesTotal}
          cardChange={cardChange}
          isEditable
        />
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <ButtonFloat
          onClick={() => setShowAdd(true)}
          position="middle"
          variant="primary"
        >
          <div className="flex items-center">
            <div className="text-[24px]">+</div>
            <div className="text-[28px]">L</div>
          </div>
        </ButtonFloat>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default ReviewLibrary;
