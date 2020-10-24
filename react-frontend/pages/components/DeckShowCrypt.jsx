import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DeckShowCryptTable from './DeckShowCryptTable.jsx';
import DeckNewCryptCard from './DeckNewCryptCard.jsx';

function DeckShowCrypt(props) {
  const [showAdd, setShowAdd] = useState(false);

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
      <div className="d-flex align-items-center justify-content-between">
        <b>
          Crypt [{cryptTotal}] - {cryptGroups}
        </b>
        {props.isAuthor && (
          <Button
            variant="outline-secondary"
            onClick={() => setShowAdd(!showAdd)}
          >
            +
          </Button>
        )}
      </div>
      {showAdd && <DeckNewCryptCard deckCardAdd={props.deckCardAdd} />}
      <DeckShowCryptTable
        deckid={props.deckid}
        deckCardChange={props.deckCardChange}
        cards={sortedCards}
        disciplinesSet={disciplinesSet}
        showImage={props.showImage}
        toggleImage={props.toggleImage}
        isAuthor={props.isAuthor}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt">
          <b>Side Crypt</b>
          <DeckShowCryptTable
            deckid={props.deckid}
            deckCardChange={props.deckCardChange}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            showImage={props.showImage}
            toggleImage={props.toggleImage}
            isAuthor={props.isAuthor}
          />
        </div>
      )}
    </>
  );
}

export default DeckShowCrypt;
