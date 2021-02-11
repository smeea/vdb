import React from 'react';
import InventoryCryptTable from './InventoryCryptTable.jsx';

function InventoryCrypt(props) {
  let total = 0;
  const cards = []

  Object.keys(props.cards).map((card) => {
    total += props.cards[card].q;
    cards.push(props.cards[card])
  });

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
        cards={cards}
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
