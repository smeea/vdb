import React, { useState, useEffect } from 'react';
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
import { countCards, containCard, deckCryptSort } from 'utils';
import { ANY } from 'utils/constants';
import { useApp } from 'context';
import { useModalCardController, useKeyDisciplines } from 'hooks';

const DiffCrypt = (props) => {
  const { handleClose, setShowFloatingButtons, showFloatingButtons } = props;
  const { cardsFrom, cardsTo, deckid, isAuthor, inMissing, inAdvSelect } =
    props;
  const { cryptDeckSort, forcedUpdate, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const cryptFrom = Object.values(cardsFrom).filter((card) => card.q > 0);
  const cryptTo = Object.values(cardsTo).filter(
    (card) => card.q > 0 && !containCard(cryptFrom, card)
  );

  const cryptFromSide = Object.values(cardsFrom).filter(
    (card) => card.q <= 0 && !containCard(cryptTo, card)
  );
  const cryptToSide = Object.values(cardsTo).filter(
    (card) =>
      card.q <= 0 &&
      !containCard(cryptFrom, card) &&
      !containCard(cryptFromSide, card)
  );

  const crypt = [...cryptFrom, ...cryptTo.map((card) => ({ q: 0, c: card.c }))];

  const cryptSide = [
    ...cryptFromSide,
    ...cryptToSide.map((card) => ({ q: 0, c: card.c })),
  ];
  const hasBanned = cryptFrom.filter((card) => card.c.Banned).length > 0;

  const cryptTotal = countCards(cryptFrom);

  const cryptGroupMin = cryptFrom
    .filter((card) => card.c.Group !== ANY)
    .reduce((acc, card) => (acc = card.c.Group < acc ? card.c.Group : acc));

  const cryptGroupMax = cryptFrom
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
    useKeyDisciplines(crypt, cryptTotal);

  // Sort cards
  const [sortedCards, setSortedCards] = useState([]);
  const [sortedCardsSide, setSortedCardsSide] = useState([]);

  useEffect(() => {
    if (cryptDeckSort) {
      setSortedCards(deckCryptSort(crypt, cryptDeckSort));
      setSortedCardsSide(deckCryptSort(cryptSide, cryptDeckSort));
    }
  }, [forcedUpdate, cardsTo, cardsFrom, cryptDeckSort]);

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
        className={
          isMobile
            ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
            : 'd-flex align-items-center justify-content-between ps-2 info-message'
        }
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
    </>
  );
};

export default DiffCrypt;
