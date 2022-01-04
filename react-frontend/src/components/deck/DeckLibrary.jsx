import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DeckLibraryTable,
  DeckLibraryTotalInfo,
  DeckNewLibraryCard,
  ResultLibraryType,
  ResultLibraryModal,
  DeckDrawProbabilityModal,
  DeckLibraryHeader,
  DeckLibraryTypeDrawInfo,
} from 'components';

import { useApp } from 'context';
import { MASTER } from 'utils/constants';
import { useModalCardController, useDeckLibrary } from 'hooks';

const DeckLibrary = (props) => {
  const { cards, deckid, isAuthor, inDeckTab, inMissing, inSearch } = props;
  const { inAdvSelect, showFloatingButtons, setShowFloatingButtons } = props;

  const { nativeLibrary, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toogleShowInfo = () => setShowInfo(!showInfo);
  const toogleShowAdd = () => setShowAdd(!showAdd);
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
  } = useDeckLibrary(cards, nativeLibrary);

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
    isMobile && setShowFloatingButtons(true);
  };

  const LibraryDeck = Object.keys(libraryByType).map((cardtype) => (
    <div key={cardtype} className="pt-2">
      <div className="d-flex justify-content-between pe-2">
        <ResultLibraryType
          cardtype={cardtype}
          total={libraryByTypeTotal[cardtype]}
          trifleTotal={cardtype === MASTER && trifleTotal}
          inAdvSelect={inAdvSelect}
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
        handleModalCardOpen={handleModalCardOpen}
        libraryTotal={libraryTotal}
        showInfo={showInfo}
        deckid={deckid}
        cards={libraryByType[cardtype]}
        isAuthor={isAuthor}
        inSearch={inSearch}
        inMissing={inMissing}
        inAdvSelect={inAdvSelect}
        setShowFloatingButtons={setShowFloatingButtons}
        isModalOpen={shouldShowModal}
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
        handleModalCardOpen={handleModalSideCardOpen}
        deckid={deckid}
        cards={librarySideByType[cardtype]}
        isAuthor={isAuthor}
        inSearch={inSearch}
        inMissing={inMissing}
        inAdvSelect={inAdvSelect}
        setShowFloatingButtons={setShowFloatingButtons}
        isModalOpen={shouldShowModal}
      />
    </div>
  ));

  return (
    <>
      <div
        className={inDeckTab && !isMobile ? 'sticky-deck-library pt-4' : null}
      >
        <DeckLibraryHeader
          isMobile={isMobile}
          libraryTotal={libraryTotal}
          inMissing={inMissing}
          bloodTotal={bloodTotal}
          poolTotal={poolTotal}
          toogleShowInfo={toogleShowInfo}
          toogleShowAdd={toogleShowAdd}
          hasBanned={hasBanned}
          inAdvSelect={inAdvSelect}
          isAuthor={isAuthor}
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
            <DeckNewLibraryCard
              setShowAdd={setShowAdd}
              cards={cards}
              deckid={deckid}
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
                <DeckNewLibraryCard
                  setShowAdd={setShowAdd}
                  cards={cards}
                  deckid={deckid}
                />
              </Modal.Body>
            </Modal>
          ))}
      </div>
      {LibraryDeck}
      {librarySide.length > 0 && !inAdvSelect && (
        <div className="deck-sidelibrary pt-2">
          <b>Side Library</b>
          {LibrarySideDeck}
        </div>
      )}
      {isMobile && isAuthor && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="d-flex float-right-middle float-add-on align-items-center justify-content-center"
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
        <ResultLibraryModal
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

export default DeckLibrary;
