import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import X from 'assets/images/icons/x.svg';
import {
  DiffCryptTable,
  DeckCryptTotalByCapacity,
  DeckNewCryptCard,
  DeckCryptSortButton,
  ResultCryptModal,
} from 'components';

import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DiffCrypt = (props) => {
  const { handleClose, setShowFloatingButtons, showFloatingButtons } = props;
  const { cardsFrom, cardsTo, deckid, isAuthor, inMissing, inAdvSelect } =
    props;
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(crypt, cryptTotal);

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
    isMobile && setShowFloatingButtons(true);
  };

  return (
    <div className={`pt-md-4 ${isMobile ? null : 'sticky-deck-crypt'}`}>
      <div
        className={`d-flex align-items-center justify-content-between ps-2 info-message
    ${isMobile ? 'pe-1' : ''}`}
      >
        <b>
          Crypt [{cryptTotal}
          {!inMissing && cryptTotal < 12 && ' of 12+'}]
          {!inMissing && ` - ${cryptGroups}`}
          {!inMissing && hasBanned && ' - WITH BANNED'}
        </b>
        {!inAdvSelect && (
          <div className="d-flex">
            <div className="pe-1">
              <DeckCryptSortButton />
            </div>
            <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>
              <InfoCircle />
            </Button>
            {isAuthor && !isMobile && (
              <div className="ps-1">
                <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
                  +
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {showInfo && (
        <div className="info-message px-2">
          <DeckCryptTotalByCapacity cards={crypt} />
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
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        setShowFloatingButtons={setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && !inAdvSelect && (
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
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            setShowFloatingButtons={setShowFloatingButtons}
          />
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
        <ResultCryptModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DiffCrypt;
