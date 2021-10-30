import React, { useContext } from 'react';
import InventoryCryptTable from './InventoryCryptTable.jsx';
import resultCryptSort from './resultCryptSort.js';
import AppContext from '../../context/AppContext.js';

function InventoryCrypt(props) {
  const { usedCryptCards, cryptCardBase } = useContext(AppContext);

  let haveTotal = 0;
  let haveUnique = 0;
  let missingTotal = 0;
  let missingUnique = 0;

  const crypt = {};
  const missingCrypt = {};

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      crypt[card] = props.cards[card];
    });
  } else {
    Object.keys(props.cards).map((card) => {
      if (props.cards[card].q > 0) {
        haveUnique += 1;
        haveTotal += props.cards[card].q;
      }

      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
        });
      }

      const miss = softUsedMax + hardUsedTotal - props.cards[card].q;

      if (miss > 0) {
        missingCrypt[card] = { q: miss, c: props.cards[card].c };
      }

      if (props.category == 'nok') {
        if (miss > 0) {
          crypt[card] = props.cards[card];
        }
      } else {
        crypt[card] = props.cards[card];
      }
    });

    Object.keys(usedCryptCards.soft).map((card) => {
      if (!props.cards[card]) {
        if (!props.compact && props.category != 'ok') {
          crypt[card] = { q: 0, c: cryptCardBase[card] };
        }

        let softUsedMax = 0;
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });

        missingCrypt[card] = { q: softUsedMax, c: cryptCardBase[card] };
      }
    });

    Object.keys(usedCryptCards.hard).map((card) => {
      if (!props.cards[card]) {
        if (!props.compact && props.category != 'ok') {
          crypt[card] = { q: 0, c: cryptCardBase[card] };
        }

        let hardUsedTotal = 0;
        if (usedCryptCards.hard[card]) {
          Object.keys(usedCryptCards.hard[card]).map((id) => {
            hardUsedTotal += usedCryptCards.hard[card][id];
          });
        }

        if (missingCrypt[card]) {
          missingCrypt[card].q += hardUsedTotal;
        } else {
          missingCrypt[card] = { q: hardUsedTotal, c: cryptCardBase[card] };
        }
      }
    });

    Object.keys(missingCrypt).map((card) => {
      missingUnique += 1;
      missingTotal += missingCrypt[card].q;
    });
  }

  const byName = (a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    }
    if (a.c['ASCII Name'] > b.c['ASCII Name']) {
      return 1;
    }
    return 0;
  };

  const sortedCards = Object.values(crypt).sort(byName);

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between px-2 info-message">
          <b>
            Crypt
            {haveTotal ? (
              <>
                {' '}
                - {haveTotal} ({haveUnique} uniq)
              </>
            ) : (
              <></>
            )}
          </b>
          <div className="d-inline gray">
            {missingTotal ? (
              <b>
                {missingTotal} ({missingUnique} uniq) miss
              </b>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      <InventoryCryptTable
        cards={sortedCards}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryCrypt;
