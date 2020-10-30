import React from 'react';
import { Button } from 'react-bootstrap';

function ResultAddCard(props) {
  const handleButton = () => props.deckCardAdd(props.cardid);
  return (
    <Button
      className="quantity"
      variant={props.inDeck ? "success" : "outline-secondary"}
      onClick={handleButton}
    >
      {props.inDeck ? props.inDeck : "+"}
    </Button>
  );
}

export default ResultAddCard;
