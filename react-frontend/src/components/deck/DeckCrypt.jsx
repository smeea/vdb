import React, { useState, useEffect, useMemo } from 'react';
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

import { deckCryptSort, initialize } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

function DeckCrypt(props) {
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const disciplinesDict = {};
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      initialize(disciplinesDict, d, 0);
      disciplinesDict[d] += props.cards[card].q;
    }
  }

  const crypt = {};
  const cryptSide = {};
  let cryptTotal = 0;
  let hasBanned = false;
  let cryptGroupMin;
  let cryptGroupMax;

  // Divide card in crypt or side and chech for Groups/Banned
  Object.keys(props.cards).map((card) => {
    if (props.cards[card].q > 0) {
      cryptTotal += props.cards[card].q;
      crypt[card] = props.cards[card];
      if (props.cards[card].c['Group'] == 'ANY') {
        return;
      }
      if (props.cards[card].c['Banned']) {
        hasBanned = true;
      }
      if (
        props.cards[card].c['Group'] < cryptGroupMin ||
        cryptGroupMin == undefined
      ) {
        cryptGroupMin = props.cards[card].c['Group'];
      }
      if (
        props.cards[card].c['Group'] > cryptGroupMax ||
        cryptGroupMax == undefined
      ) {
        cryptGroupMax = props.cards[card].c['Group'];
      }
    } else {
      cryptSide[card] = props.cards[card];
    }
  });

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  // Disciplines Sort and Key non-Key selection
  const disciplinesForSort = [];
  Object.keys(disciplinesDict).map((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  const REQUIRED_FRACTION = 0.5;
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] >= cryptTotal * REQUIRED_FRACTION) {
        keyDisciplines += 1;
      }
    });

  const nonKeyDisciplinesList = [];
  for (let i = keyDisciplines; i < disciplinesSet.length; i++) {
    nonKeyDisciplinesList.push(disciplinesSet[i]);
  }

  let nonKeyDisciplines = 0;
  Object.keys(props.cards).map((card) => {
    let counter = 0;
    Object.keys(props.cards[card].c['Disciplines']).map((d) => {
      if (nonKeyDisciplinesList.includes(d)) {
        counter += 1;
      }
    });
    if (nonKeyDisciplines < counter) nonKeyDisciplines = counter;
  });

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
  }, [changeTimer, props.deckid, cryptDeckSort]);

  // Modal Card Controller
  const cryptCards = useMemo(() => sortedCards.map((card) => card.c));
  const cryptSideCards = useMemo(() => sortedCardsSide.map((card) => card.c));

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(cryptCards, cryptSideCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && props.setShowFloatingButtons(true);
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
          {!props.inMissing && cryptTotal < 12 && ' of 12+'}]
          {!props.inMissing && ` - ${cryptGroups}`}
          {!props.inMissing && hasBanned && ' - WITH BANNED'}
        </b>
        {!props.inAdvSelect && (
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
            {props.isAuthor && !isMobile && (
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
            cards={props.cards}
            deckid={props.deckid}
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
                cards={props.cards}
                deckid={props.deckid}
              />
            </Modal.Body>
          </Modal>
        ))}
      <DeckCryptTable
        handleModalCardOpen={handleModalCardOpen}
        deckid={props.deckid}
        cards={sortedCards}
        cryptTotal={cryptTotal}
        disciplinesSet={disciplinesSet}
        showInfo={showInfo}
        isAuthor={props.isAuthor}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        inSearch={props.inSearch}
        inMissing={props.inMissing}
        inAdvSelect={props.inAdvSelect}
        setShowFloatingButtons={props.setShowFloatingButtons}
        isModalOpen={shouldShowModal}
      />
      {Object.keys(cryptSide).length > 0 && !props.inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            deckid={props.deckid}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            isAuthor={props.isAuthor}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            inSearch={props.inSearch}
            inMissing={props.inMissing}
            inAdvSelect={props.inAdvSelect}
            setShowFloatingButtons={props.setShowFloatingButtons}
            isModalOpen={shouldShowModal}
          />
        </div>
      )}
      {isMobile && props.isAuthor && props.showFloatingButtons && (
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
}

export default DeckCrypt;
