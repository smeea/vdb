import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

function ResultAddCard(props) {
  const handleButton = () => props.deckCardAdd(props.cardid);
  return(
    <Button variant='outline-secondary' onClick={handleButton}>
      <Plus size={16} />
    </Button>
  );
}

export default ResultAddCard;
