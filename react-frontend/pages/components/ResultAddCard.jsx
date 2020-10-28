import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from '../../assets/images/icons/plus.svg';

function ResultAddCard(props) {
  const handleButton = () => props.deckCardAdd(props.cardid);
  return (
    <Button
      variant={props.inDeck ? "success" : "outline-secondary"}
      onClick={handleButton}
    >
      {props.inDeck ? props.inDeck : <Plus size={16} />}
    </Button>
  );
}

export default ResultAddCard;
