import React, { useState } from 'react';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckLibraryTotalInfo,
  DeckNewCard,
  DeckDrawProbability,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
  Modal,
  ButtonFloat,
} from '@/components';
import { MASTER } from '@/utils/constants';
import { useApp } from '@/context';
import { useModalCardController, useDeckLibrary } from '@/hooks';

const DiffLibrary = ({ cardsFrom, cardsTo, deckid, isEditable }) => {
  const { isMobile, showFloatingButtons, setShowFloatingButtons } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const toggleShowAdd = () => setShowAdd(!showAdd);

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
        isMobile={isMobile}
        libraryTotal={libraryTotal}
        bloodTotal={bloodTotal}
        poolTotal={poolTotal}
        toggleShowInfo={toggleShowInfo}
        toggleShowAdd={toggleShowAdd}
        hasBanned={hasBanned}
        isEditable={isEditable}
      />
      {showInfo && (
        <div className="bg-bgSecondary dark:bg-bgSecondaryDark ">
          <DeckLibraryTotalInfo
            byDisciplines={libraryByDisciplinesTotal}
            byTypes={libraryByTypeTotal}
            byClans={libraryByClansTotal}
          />
        </div>
      )}
      {showAdd &&
        (!isMobile ? (
          <DeckNewCard
            setShowAdd={setShowAdd}
            cards={cardsFrom}
            deckid={deckid}
            target="library"
          />
        ) : (
          <Modal handleClose={() => setShowAdd(false)} title="Add Library Card">
            <DeckNewCard
              setShowAdd={setShowAdd}
              cards={cardsFrom}
              deckid={deckid}
              target="library"
            />
          </Modal>
        ))}
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className=" opacity-60">
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
