import React from 'react';
import { Button } from 'react-bootstrap';

function ResultAddCard(props) {
  const handleButton = () => props.cardAdd(props.cardid);
  return(
    <Button variant='outline-primary' onClick={handleButton}>
      {'<'}
    </Button>
  );
}

export default ResultAddCard;
