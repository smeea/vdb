import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AppContext from '../../context/AppContext.js';

function ResultAddCard(props) {
  const { deckCardChange } = useContext(AppContext);

  const handleButton = () => {
    deckCardChange(props.deckid, props.card.Id, props.inDeck + 1);
  };

  return (
    <Button
      className={props.inDeck > 0 ? 'in' : 'add'}
      variant="outline-secondary"
      onClick={handleButton}
      block
    >
      {props.inDeck > 0 ? props.inDeck : '+'}
    </Button>
  );
}

export default ResultAddCard;
