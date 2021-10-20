import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCryptTotalByCapacity from './DeckCryptTotalByCapacity.jsx';
import DeckCryptTable from './DeckCryptTable.jsx';
import DeckNewCryptCard from './DeckNewCryptCard.jsx';
import DeckCryptSortButton from './DeckCryptSortButton.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';
import UsedDescription from './UsedDescription.jsx';
import deckCryptSort from './deckCryptSort.js';
import AppContext from '../../context/AppContext';

function DeckCrypt(props) {
  const {
    decks,
    inventoryMode,
    inventoryCrypt,
    usedCryptCards,
    cryptDeckSort,
    changeTimer,
    isMobile,
  } = useContext(AppContext);

  const [showAdd, setShowAdd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  useEffect(() => {
    if (inventoryMode && modalCardIdx !== undefined) {
      const cardid =
        modalCardIdx !== undefined
          ? cryptCards[modalCardIdx].Id
          : cryptSideCards[modalSideCardIdx].Id;

      let inInventory = 0;
      let softUsedMax = 0;
      let hardUsedTotal = 0;
      let SoftUsedDescription;
      let HardUsedDescription;

      if (decks && inventoryMode) {
        if (Object.keys(inventoryCrypt).includes(cardid.toString())) {
          inInventory = inventoryCrypt[cardid].q;
        }

        if (usedCryptCards && usedCryptCards.soft[cardid]) {
          SoftUsedDescription = Object.keys(usedCryptCards.soft[cardid]).map(
            (id) => {
              if (softUsedMax < usedCryptCards.soft[cardid][id]) {
                softUsedMax = usedCryptCards.soft[cardid][id];
              }
              return (
                <UsedDescription
                  key={id}
                  q={usedCryptCards.soft[cardid][id]}
                  deckName={decks[id]['name']}
                  t="s"
                />
              );
            }
          );
        }

        if (usedCryptCards && usedCryptCards.hard[cardid]) {
          HardUsedDescription = Object.keys(usedCryptCards.hard[cardid]).map(
            (id) => {
              hardUsedTotal += usedCryptCards.hard[cardid][id];
              return (
                <UsedDescription
                  key={id}
                  q={usedCryptCards.hard[cardid][id]}
                  deckName={decks[id]['name']}
                  t="h"
                />
              );
            }
          );
        }
      }

      setModalInventory({
        inInventory: inInventory,
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
        usedDescription: {
          soft: SoftUsedDescription,
          hard: HardUsedDescription,
        },
      });
    }
  }, [modalCardIdx, inventoryMode]);

  const handleModalCardOpen = (i) => {
    setModalCardIdx(cryptCards.indexOf(i));
  };

  const handleModalSideCardOpen = (i) => {
    setModalSideCardIdx(cryptSideCards.indexOf(i));
  };

  const handleModalCardChange = (d) => {
    if (modalCardIdx !== undefined) {
      const maxIdx = cryptCards.length - 1;
      if (modalCardIdx + d < 0) {
        setModalCardIdx(maxIdx);
      } else if (modalCardIdx + d > maxIdx) {
        setModalCardIdx(0);
      } else {
        setModalCardIdx(modalCardIdx + d);
      }
    } else {
      const maxIdx = cryptSideCards.length - 1;

      if (modalSideCardIdx + d < 0) {
        setModalSideCardIdx(maxIdx);
      } else if (modalSideCardIdx + d > maxIdx) {
        setModalSideCardIdx(0);
      } else {
        setModalSideCardIdx(modalSideCardIdx + d);
      }
    }
  };

  const disciplinesDict = {};
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = 0;
        disciplinesDict[d] += props.cards[card].q;
      } else {
        disciplinesDict[d] += props.cards[card].q;
      }
    }
  }

  const crypt = {};
  const cryptSide = {};
  const cryptCards = [];
  const cryptSideCards = [];
  let cryptTotal = 0;
  let hasBanned = false;
  let cryptGroupMin;
  let cryptGroupMax;

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
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] > cryptTotal * 0.4) {
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

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const [sortedState, setSortedState] = useState([]);
  const [sortedSideState, setSortedSideState] = useState([]);

  const sortedCards = sortedState
    .filter((card) => crypt[card])
    .map((card) => {
      cryptCards.push(crypt[card].c);
      return crypt[card];
    });

  const sortedCardsSide = sortedSideState
    .filter((card) => cryptSide[card])
    .map((card) => {
      cryptSideCards.push(cryptSide[card].c);
      return cryptSide[card];
    });

  useEffect(() => {
    if (cryptDeckSort) {
      const sorted = deckCryptSort(Object.values(crypt), cryptDeckSort);
      const sortedSide = deckCryptSort(Object.values(cryptSide), cryptDeckSort);
      setSortedState(
        sorted.map((i) => {
          return i['c']['Id'];
        })
      );
      setSortedSideState(
        sortedSide.map((i) => {
          return i['c']['Id'];
        })
      );
    }
  }, [changeTimer, props.deckid, cryptDeckSort]);

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
          {!props.inMissing && cryptTotal < 12 && ' of 12+'}]
          {!props.inMissing && ` - ${cryptGroups}`}
          {!props.inMissing && hasBanned && ' - WITH BANNED'}
        </b>
        {!props.inAdvSelect && (
          <div className="d-flex">
            <div className="pe-1">
              <DeckCryptSortButton />
            </div>
            <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>
              <InfoCircle />
            </Button>
            {props.isAuthor && !isMobile && (
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
              <Button variant="outline-secondary" onClick={props.handleClose}>
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
        setModalInventory={setModalInventory}
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
      />
      {Object.keys(cryptSide).length > 0 && !props.inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            setModalInventory={setModalInventory}
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
      {(modalCardIdx !== undefined || modalSideCardIdx !== undefined) && (
        <ResultCryptModal
          card={
            modalCardIdx !== undefined
              ? cryptCards[modalCardIdx]
              : cryptSideCards[modalSideCardIdx]
          }
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            setModalSideCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
          inventoryState={modalInventory}
        />
      )}
    </>
  );
}

export default DeckCrypt;
