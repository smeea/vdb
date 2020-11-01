import React from 'react';
import { Button } from 'react-bootstrap';

function ResultAddCard(props) {
  const handleButton = () => props.deckCardAdd(props.cardid);
  return (
    <Button
      className={props.inDeck ? 'quantity in-deck' : 'quantity'}
      variant="outline-secondary"
      onClick={handleButton}
    >
      {props.inDeck ? props.inDeck : '+'}
    </Button>
  );
}

export default ResultAddCard;
