import React from 'react';
import DeckPreviewCryptTable from './DeckPreviewCryptTable.jsx';

function DeckPreviewCrypt(props) {
  const dSet = new Set();
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      dSet.add(d);
    }
  }
  const disciplinesSet = [...dSet].sort();

  const crypt = {};
  const cryptSide = {};

  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
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

  let cryptTotal = 0;
  for (const card in crypt) {
    if (card) {
      cryptTotal += crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantity = (a, b) => {
    if (a.q > b.q) return -1;
    else return 1;
  };

  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) return 1;
    else return -1;
  };

  const sortedCards = Object.values(crypt)
    .sort(SortByCapacity)
    .sort(SortByQuantity);

  const sortedCardsSide = Object.values(cryptSide)
    .sort(SortByCapacity)
    .reverse();

  return (
    <>
      <div className="deck-crypt">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
        </b>
        <DeckPreviewCryptTable
          showImage={props.showImage}
          toggleImage={props.toggleImage}
          deckid={props.deckid}
          deckCardChange={props.deckCardChange}
          cards={sortedCards}
          disciplinesSet={disciplinesSet}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt">
          <b>Side Crypt</b>
          <DeckPreviewCryptTable
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            deckid={props.deckid}
            deckCardChange={props.deckCardChange}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
          />
        </div>
      )}
    </>
  );
}

export default DeckPreviewCrypt;
