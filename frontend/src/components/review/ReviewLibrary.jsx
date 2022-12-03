import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DiffLibraryTable,
  ResultLibraryType,
  ResultModal,
  DeckLibraryTotalInfo,
  DeckNewCard,
  DeckDrawProbabilityModal,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
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
      <div className="flex justify-between pe-2">
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
      <div className={!isMobile ? 'sticky-deck-library pt-4 pt-md-4' : null}>
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
          <div className="info-message ps-2">
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
              show={showAdd}
              onHide={() => setShowAdd(false)}
              animation={false}
            >
              <Modal.Header
                className={isMobile ? 'pt-3 pb-1 ps-3 pe-2' : 'pt-3 pb-1 px-4'}
              >
                <h5>Add Library Card</h5>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowAdd(false)}
                >
                  <X width="32" height="32" viewBox="0 0 16 16" />
                </Button>
              </Modal.Header>
              <Modal.Body className="p-0">
                <DeckNewCard
                  setShowAdd={setShowAdd}
                  cards={cardsFrom}
                  target="library"
                  cardChange={cardChange}
                />
              </Modal.Body>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {Object.keys(librarySide).length > 0 && (
        <div className="opacity-60 pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="flex float-right-middle float-add-on items-center justify-center"
        >
          <div className="d-inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
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
