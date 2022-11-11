import React from 'react';
import { useSnapshot } from 'valtio';
import { Button } from 'react-bootstrap';
import { deckStore, deckCardChange } from 'context';

const ButtonAddCard = ({ deckid, card, inDeck, inQuick }) => {
  const decks = useSnapshot(deckStore).decks;

  const handleButton = () => {
    deckCardChange(deckid, card, inDeck + 1);
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
