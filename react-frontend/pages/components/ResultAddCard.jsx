import React from 'react';
import { Button } from 'react-bootstrap';

function ResultAddCard(props) {
  const handleButton = () => props.inDeck > 0 ? props.cardChange(props.deckid, props.card.Id, props.inDeck + 1) : props.cardAdd(props.card.Id);

  return (
    <Button
      className={props.inDeck > 0 ? 'in' : 'add'}
      variant="outline-secondary"
      onClick={handleButton}
    >
      {props.inDeck > 0 ? props.inDeck : '+'}
    </Button>
  );
}

export default ResultAddCard;
