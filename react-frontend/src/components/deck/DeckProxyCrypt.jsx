import React, { useState, useEffect } from 'react';
import { DeckProxyCryptTable, ResultCryptModal } from 'components';
import { useApp } from 'context';

function DeckProxyCrypt(props) {
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const [modalCardIdx, setModalCardIdx] = useState(undefined);
  const [modalSideCardIdx, setModalSideCardIdx] = useState(undefined);

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
  let cryptTotalSelected = 0;

  Object.keys(props.cards).map((card) => {
    if (props.cards[card].q > 0) {
      cryptTotal += props.cards[card].q;
      crypt[card] = props.cards[card];
    } else {
      cryptSide[card] = props.cards[card];
    }

    if (
      props.proxySelected[card] &&
      props.proxySelected[card].print &&
      props.proxySelected[card].q > 0
    ) {
      cryptTotalSelected += props.proxySelected[card].q;
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

  const SortByQuantity = (a, b) => {
    return b.q - a.q;
  };

  const SortByCapacity = (a, b) => {
    return b.c['Capacity'] - a.c['Capacity'];
  };

  const [sortedState, setSortedState] = useState([]);

  const sortedCards = sortedState
    .filter((card) => crypt[card])
    .map((card) => {
      cryptCards.push(crypt[card].c);
      return crypt[card];
    });

  const sortedCardsSide = Object.values(cryptSide)
    .sort(SortByCapacity)
    .map((card) => {
      cryptSideCards.push(card.c);
      return card;
    });

  useEffect(() => {
    if (cryptDeckSort) {
      setSortedState(
        Object.values(crypt)
          .sort(SortByQuantity)
          .sort(SortByCapacity)
          .map((i) => {
            return i['c']['Id'];
          })
      );
    } else {
      setSortedState(
        Object.values(crypt)
          .sort(SortByCapacity)
          .sort(SortByQuantity)
          .map((i) => {
            return i['c']['Id'];
          })
      );
    }
  }, [changeTimer, cryptDeckSort]);

  return (
    <>
      <div
        className={
          isMobile
            ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
            : 'd-flex align-items-center justify-content-between ps-2 info-message'
        }
      >
        <b>Crypt [{cryptTotalSelected}]</b>
      </div>
      <DeckProxyCryptTable
        handleModalCardOpen={handleModalCardOpen}
        cards={sortedCards}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        handleProxySelector={props.handleProxySelector}
        handleSetSelector={props.handleSetSelector}
        handleProxyCounter={props.handleProxyCounter}
        proxySelected={props.proxySelected}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && !props.inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckProxyCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            handleProxySelector={props.handleProxySelector}
            handleSetSelector={props.handleSetSelector}
            handleProxyCounter={props.handleProxyCounter}
            proxySelected={props.proxySelected}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
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
        />
      )}
    </>
  );
}

export default DeckProxyCrypt;
