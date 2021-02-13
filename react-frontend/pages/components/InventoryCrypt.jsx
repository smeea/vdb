import React from 'react';
import InventoryCryptTable from './InventoryCryptTable.jsx';

function InventoryCrypt(props) {
  let total = 0;
  const crypt = {...props.cards}

  if (!props.compact) {
    Object.keys(props.usedCards.soft).map((card) => {
      if (!crypt[card]) {
        crypt[card] = {q: 0, c: props.cardBase[card]}
      }
    })

    Object.keys(props.usedCards.hard).map((card) => {
      if (!crypt[card]) {
        crypt[card] = {q: 0, c: props.cardBase[card]}
      }
    })
  };

  const cards = []

  Object.keys(crypt).map((card) => {
    total += crypt[card].q;
    cards.push(crypt[card])
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
    <div className="pt-4">
      {!props.compact &&
       <div className="d-flex align-items-center justify-content-between pl-2 info-message">
         <b>
           Crypt [{total}]
         </b>
       </div>
      }
      <InventoryCryptTable
        cardChange={props.cardChange}
        decks={props.decks}
        cards={sortedCards}
        usedCards={props.usedCards}
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        isAuthor={props.isAuthor}
        isMobile={props.isMobile}
        isWide={props.isWide}
        compact={props.compact}
      />
    </div>
  );
}

export default InventoryCrypt;
