import React, { useContext } from 'react';
import InventoryCryptTable from './InventoryCryptTable.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryCrypt(props) {
  const { usedCryptCards, cryptCardBase } = useContext(AppContext);
  let crypt = {};

  if (props.category == 'nok') {
    Object.keys(props.cards).map((card) => {
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

      if (props.cards[card].q < softUsedMax + hardUsedTotal) {
        crypt[card] = props.cards[card];
      }
    });
  } else {
    crypt = { ...props.cards };
  }

  if (!props.compact && props.category != 'ok') {
    Object.keys(usedCryptCards.soft).map((card) => {
      if (!props.cards[card]) {
        crypt[card] = { q: 0, c: cryptCardBase[card] };
      }
    });

    Object.keys(usedCryptCards.hard).map((card) => {
      if (!props.cards[card]) {
        crypt[card] = { q: 0, c: cryptCardBase[card] };
      }
    });
  }

  let total = 0;
  const unique = Object.keys(props.cards).length;
  const cards = [];

  Object.keys(crypt).map((card) => {
    total += crypt[card].q;
    if (props.category != 'ok' || crypt[card].q > 0) {
      cards.push(crypt[card]);
    }
  });

  const byName = (a, b) => {
    if (a.c['ASCII Name'] < b.c['ASCII Name']) {
      return -1;
    } else {
      return 1;
    }
  };

  const sortedCards = cards.sort(byName);

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between pl-2 info-message">
          <b>
            Crypt{' '}
            {props.category != 'nok' && (
              <>
                - {total} total, {unique} unique
              </>
            )}
          </b>
        </div>
      )}
      <InventoryCryptTable
        cardChange={props.cardChange}
        decks={props.decks}
        cards={sortedCards}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryCrypt;
