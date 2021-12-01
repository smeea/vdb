import React from 'react';
import { Button } from 'react-bootstrap';
import { useApp } from 'context';

function ButtonAddCard(props) {
  const { decks, deckCardChange } = useApp();

  const handleButton = () => {
    deckCardChange(props.deckid, props.card.Id, props.inDeck + 1);
  };

  let title = 'Add to Deck';
  if (props.inZap && decks && decks[props.deckid]) {
    title = props.inDeck
      ? `In deck "${decks[props.deckid].name}"`
      : `Add to Deck "${decks[props.deckid].name}"`;
  }

  return (
    <Button
      className={props.inDeck > 0 ? 'in' : 'add'}
      variant="primary"
      onClick={handleButton}
      title={title}
    >
      {props.inDeck ? props.inDeck : '+'}
    </Button>
  );
}

export default ButtonAddCard;
