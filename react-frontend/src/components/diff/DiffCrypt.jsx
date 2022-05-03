import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  DiffCryptTable,
  DeckCryptTotalInfo,
  DeckNewCryptCard,
  ResultModal,
  DeckCryptHeader,
} from 'components';

import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DiffCrypt = ({
  handleClose,
  setShowFloatingButtons,
  showFloatingButtons,
  cardsFrom,
  cardsTo,
  deckid,
  isPublic,
  isAuthor,
  inMissing,
}) => {
  const { cryptDeckSort, changeTimer, isNarrow, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const toggleShowAdd = () => setShowAdd(!showAdd);

  const {
    crypt,
    cryptSide,
    hasBanned,
    cryptTotal,
    cryptGroups,
    sortedCards,
    sortedCardsSide,
  } = useDeckCrypt(cardsFrom, cryptDeckSort, changeTimer, deckid, cardsTo);

  // Disciplines Sort and Key non-Key selection
  const {
    disciplinesSet,
    keyDisciplines,
    nonKeyDisciplines,
    disciplinesDetailed,
  } = useKeyDisciplines(crypt, cryptTotal);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleCloseModal = () => {
    handleModalCardClose();
    isNarrow && setShowFloatingButtons(true);
  };

  return (
    <div className={`pt-md-4 ${isMobile ? null : 'sticky-deck-crypt'}`}>
      <DeckCryptHeader
        cryptTotal={cryptTotal}
        inMissing={inMissing}
        cryptGroups={cryptGroups}
        toggleShowInfo={toggleShowInfo}
        toggleShowAdd={toggleShowAdd}
        hasBanned={hasBanned}
        isAuthor={isAuthor}
        isPublic={isPublic}
      />
      {showInfo && (
        <div className="info-message px-2">
          <DeckCryptTotalInfo
            disciplinesDetailed={disciplinesDetailed}
            cards={crypt}
          />
        </div>
      )}
      {showAdd &&
        (!isMobile ? (
          <DeckNewCryptCard
            setShowAdd={setShowAdd}
            cards={cardsFrom}
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
              <h5>Add Crypt Card</h5>
              <Button variant="outline-secondary" onClick={handleClose}>
                <X width="32" height="32" viewBox="0 0 16 16" />
              </Button>
            </Modal.Header>
            <Modal.Body className="p-0">
              <DeckNewCryptCard
                setShowAdd={setShowAdd}
                cards={cardsFrom}
                deckid={deckid}
              />
            </Modal.Body>
          </Modal>
        ))}
      <DiffCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={deckid}
        cards={sortedCards}
        cardsFrom={cardsFrom}
        cardsTo={cardsTo}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isAuthor={isAuthor}
        isPublic={isPublic}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        setShowFloatingButtons={setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DiffCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={deckid}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            disciplinesSet={disciplinesSet}
            isAuthor={isAuthor}
            isPublic={isPublic}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </div>
      )}
      {isMobile && !isPublic && isAuthor && showFloatingButtons && (
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
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DiffCrypt;
