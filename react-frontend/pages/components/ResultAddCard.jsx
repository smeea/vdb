import React from 'react';
import { Button } from 'react-bootstrap';
import Plus from '../../assets/images/icons/plus.svg';

function ResultAddCard(props) {
  const handleButton = () => props.deckCardAdd(props.cardid);
  return (
    <Button variant="outline-secondary" onClick={handleButton}>
      <Plus size={16} />
    </Button>
  );
}

export default ResultAddCard;
