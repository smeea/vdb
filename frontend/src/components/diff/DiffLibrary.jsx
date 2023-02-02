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

const DiffLibrary = ({ cardsFrom, cardsTo, deckid, isEditable }) => {
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
        handleModalCardOpen={handleModalCardOpen}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        deckid={deckid}
        cards={libraryByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        isEditable={isEditable}
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
        handleModalCardOpen={handleModalSideCardOpen}
        deckid={deckid}
        cards={librarySideByType[cardtype]}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        isEditable={isEditable}
      />
    </div>
  ));

  return (
    <>
      <DeckLibraryHeader
        libraryTotal={libraryTotal}
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
      <div className="space-y-2">{LibraryDeck}</div>
      {Object.keys(librarySide).length > 0 && (
        <div className=" opacity-60 dark:opacity-50">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && isEditable && showFloatingButtons && (
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

export default DiffLibrary;
