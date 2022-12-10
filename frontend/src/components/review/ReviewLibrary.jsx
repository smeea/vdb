import React, { useState } from 'react';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckLibraryTotalInfo,
  DeckNewCard,
  DeckDrawProbabilityModal,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
  Modal,
} from 'components';
import { MASTER } from 'utils/constants';
import { useApp } from 'context';
import { useModalCardController, useDeckLibrary } from 'hooks';

const ReviewLibrary = ({ cardChange, cardsFrom, cardsTo }) => {
  const { isMobile, showFloatingButtons, setShowFloatingButtons } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const toggleShowAdd = () => setShowAdd(!showAdd);
  const [modalDraw, setModalDraw] = useState(undefined);

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

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype} className="pt-2">
      <div className="pr-2 flex justify-between">
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
      <DiffLibraryTable
        inReview
        isAuthor={true}
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
        inReview
        isAuthor={true}
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
      <div className={!isMobile ? 'sticky-deck-library pt-md-4 pt-4' : null}>
        <DeckLibraryHeader
          isMobile={isMobile}
          libraryTotal={libraryTotal}
          bloodTotal={bloodTotal}
          poolTotal={poolTotal}
          toggleShowInfo={toggleShowInfo}
          toggleShowAdd={toggleShowAdd}
          hasBanned={hasBanned}
          inReview
        />
        {showInfo && (
          <div className="info-message pl-2">
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
              target="library"
              cardChange={cardChange}
            />
          ) : (
            <Modal
              handleClose={() => setShowAdd(false)}
              title="Add Library Card"
            >
              <div>
                <DeckNewCard
                  setShowAdd={setShowAdd}
                  cards={cardsFrom}
                  target="library"
                  cardChange={cardChange}
                />
              </div>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="pt-2 opacity-60">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="float-right-middle float-add-on flex items-center justify-center"
        >
          <div className="inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="inline" style={{ fontSize: '1.6em' }}>
            L
          </div>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default ReviewLibrary;
