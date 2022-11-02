import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from 'react-bootstrap';
import { useApp, deckStore, deckCardChange } from 'context';

const ButtonAddCard = ({ deckid, card, inDeck, inQuick }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const decks = useSnapshot(deckStore).decks;

  const handleButton = () => {
    deckCardChange(deckid, card.Id, inDeck + 1, cryptCardBase, libraryCardBase);
  };

  let title = 'Add to Deck';
  if (inQuick && decks && decks[deckid]) {
    title = inDeck
      ? `In deck "${decks[deckid].name}"`
      : `Add to Deck "${decks[deckid].name}"`;
  }

  return (
    <Button
      className={inDeck > 0 ? 'in' : 'add'}
      variant="primary"
      onClick={handleButton}
      title={title}
    >
      {inDeck ? inDeck : '+'}
    </Button>
  );
};

export default ButtonAddCard;
