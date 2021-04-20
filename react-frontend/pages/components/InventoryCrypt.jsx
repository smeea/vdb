import React from 'react';
import InventoryCryptTable from './InventoryCryptTable.jsx';

function InventoryCrypt(props) {
  let crypt = {};

  if (props.category == 'nok') {
    Object.keys(props.cards).map((card) => {
      let softUsedMax = 0;
      if (props.usedCards.soft[card]) {
        Object.keys(props.usedCards.soft[card]).map((id) => {
          if (softUsedMax < props.usedCards.soft[card][id]) {
            softUsedMax = props.usedCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (props.usedCards.hard[card]) {
        Object.keys(props.usedCards.hard[card]).map((id) => {
          hardUsedTotal += props.usedCards.hard[card][id];
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
    Object.keys(props.usedCards.soft).map((card) => {
      if (!props.cards[card]) {
        crypt[card] = { q: 0, c: props.cardBase[card] };
      }
    });

    Object.keys(props.usedCards.hard).map((card) => {
      if (!props.cards[card]) {
        crypt[card] = { q: 0, c: props.cardBase[card] };
      }
    });
  }

  let total = 0;
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
          <b>Crypt {props.category != 'nok' && <>[{total}]</>}</b>
        </div>
      )}
      <InventoryCryptTable
        cardChange={props.cardChange}
        decks={props.decks}
        cards={sortedCards}
        usedCards={props.usedCards}
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        isMobile={props.isMobile}
        isWide={props.isWide}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryCrypt;
