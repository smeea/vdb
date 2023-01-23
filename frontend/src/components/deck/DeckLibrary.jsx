import React, { useState } from 'react';
import {
  DeckLibraryTable,
  DeckLibraryTotalInfo,
  DeckNewCard,
  ResultLibraryType,
  ResultModal,
  DeckDrawProbabilityModal,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
  Modal,
  ButtonFloat,
} from 'components';
import { useApp } from 'context';
import { MASTER } from 'utils/constants';
import { useModalCardController, useDeckLibrary } from 'hooks';

const DeckLibrary = ({ deck, inMissing }) => {
  const { isMobile, isNarrow, showFloatingButtons, setShowFloatingButtons } =
    useApp();
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;
  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const toggleShowAdd = () => setShowAdd(!showAdd);
  const [modalDraw, setModalDraw] = useState();

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
      <div className="flex justify-between">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype === MASTER && trifleTotal}
        />
        {showInfo && (
          <DeckLibraryTypeDrawInfo
            cardtype={cardtype}
            isMobile={isMobile}
            libraryTotal={libraryTotal}
            libraryByTypeTotal={libraryByTypeTotal}
            setModalDraw={setModalDraw}
          />
        )}
      </div>
      <DeckLibraryTable
        deck={deck}
        handleModalCardOpen={handleModalCardOpen}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        cards={libraryByType[cardtype]}
        inMissing={inMissing}
        isModalOpen={shouldShowModal}
        placement={isNarrow ? 'bottom' : 'right'}
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
        handleModalCardOpen={handleModalSideCardOpen}
        cards={librarySideByType[cardtype]}
        inMissing={inMissing}
        isModalOpen={shouldShowModal}
        placement={isNarrow ? 'bottom' : 'right'}
      />
    </div>
  ));

  return (
    <div className="space-y-2">
      <div
        className={
          !inMissing && !isMobile
            ? 'top-[32px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark'
            : null
        }
      >
        <DeckLibraryHeader
          isMobile={isMobile}
          libraryTotal={libraryTotal}
          inMissing={inMissing}
          bloodTotal={bloodTotal}
          poolTotal={poolTotal}
          toggleShowInfo={toggleShowInfo}
          toggleShowAdd={toggleShowAdd}
          hasBanned={hasBanned}
          isEditable={isEditable}
        />
        {showInfo && (
          <div className="bg-bgSecondary p-2 dark:bg-bgSecondaryDark">
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
              cards={deck.library}
              deckid={deckid}
              target="library"
            />
          ) : (
            <Modal
              handleClose={() => setShowAdd(false)}
              title="Add Library Card"
            >
              <div>
                <DeckNewCard
                  setShowAdd={setShowAdd}
                  cards={deck.library}
                  deckid={deckid}
                  target="library"
                />
              </div>
            </Modal>
          ))}
      </div>
      <div className="space-y-2">{LibraryDeck}</div>
      {librarySide.length > 0 && (
        <div className="space-y-2 opacity-60">
          <div className="flex h-[42px] items-center bg-bgSecondary px-2 py-1 font-bold dark:bg-bgSecondaryDark">
            Side Library
          </div>
          <div className="space-y-2">{LibrarySideDeck}</div>
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
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </div>
  );
};

export default DeckLibrary;
