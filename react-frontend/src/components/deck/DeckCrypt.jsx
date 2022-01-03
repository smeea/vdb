import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from 'assets/images/icons/info-circle.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckCryptTotalByCapacity,
  DeckCryptTable,
  DeckNewCryptCard,
  DeckCryptSortButton,
  ResultCryptModal,
} from 'components';

import { ANY } from 'utils/constants';
import { deckCryptSort, countCards } from 'utils';
import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines } from 'hooks';

const DeckCrypt = (props) => {
  const { cards, inAdvSelect, setShowFloatingButtons } = props;
  const { inMissing, deckid, isAuthor, inSearch } = props;
  const { cryptDeckSort, forcedUpdate, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const crypt = Object.values(cards).filter((card) => card.q > 0);
  const cryptSide = Object.values(cards).filter((card) => card.q <= 0);
  const cryptTotal = countCards(crypt);
  const hasBanned = crypt.filter((card) => card.c.Banned).length > 0;

  const cryptGroupMin = crypt
    .filter((card) => card.c.Group !== ANY)
    .reduce((acc, card) => (acc = card.c.Group < acc ? card.c.Group : acc));

  const cryptGroupMax = crypt
    .filter((card) => card.c.Group !== ANY)
    .reduce((acc, card) => (acc = card.c.Group > acc ? card.c.Group : acc), 0);

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  // Disciplines Sort and Key non-Key selection
  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(cards, cryptTotal);

  // Sort cards
  const [sortedCards, setSortedCards] = useState([]);
  const [sortedCardsSide, setSortedCardsSide] = useState([]);

  useEffect(() => {
    if (cryptDeckSort) {
      setSortedCards(deckCryptSort(Object.values(crypt), cryptDeckSort));
      setSortedCardsSide(
        deckCryptSort(Object.values(cryptSide), cryptDeckSort)
      );
    }
  }, [forcedUpdate, deckid, cryptDeckSort]);

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
    <>
      <div
        className={`d-flex align-items-center justify-content-between ps-2 ${
          isMobile ? 'pe-1' : ''
        } info-message`}
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
            <Button
              title="Additional Info"
              variant="primary"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoCircle />
            </Button>
            {isAuthor && !isMobile && (
              <div className="ps-1">
                <Button
                  title="Add Card"
                  variant="primary"
                  onClick={() => setShowAdd(!showAdd)}
                >
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
              <h5>Add Crypt Card</h5>
              <Button
                variant="outline-secondary"
                onClick={() => setShowAdd(false)}
              >
                <X width="32" height="32" viewBox="0 0 16 16" />
              </Button>
            </Modal.Header>
            <Modal.Body className="p-0">
              <DeckNewCryptCard
                setShowAdd={setShowAdd}
                cards={cards}
                deckid={deckid}
              />
            </Modal.Body>
          </Modal>
        ))}
      <DeckCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={deckid}
        cards={sortedCards}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isAuthor={isAuthor}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        inSearch={inSearch}
        inMissing={inMissing}
        inAdvSelect={inAdvSelect}
        setShowFloatingButtons={setShowFloatingButtons}
        isModalOpen={shouldShowModal}
      />
      {Object.keys(cryptSide).length > 0 && !inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={deckid}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            isAuthor={isAuthor}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            inSearch={inSearch}
            inMissing={inMissing}
            inAdvSelect={inAdvSelect}
            setShowFloatingButtons={setShowFloatingButtons}
            isModalOpen={shouldShowModal}
          />
        </div>
      )}
      {isMobile && isAuthor && showFloatingButtons && (
        <div
          onClick={() => setShowAdd(true)}
          className="d-flex float-right-top float-add-on align-items-center justify-content-center"
        >
          <div className="d-inline" style={{ fontSize: '1.4em' }}>
            +
          </div>
          <div className="d-inline" style={{ fontSize: '1.6em' }}>
            C
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
    </>
  );
};

export default DeckCrypt;
