import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus, Dash } from 'react-bootstrap-icons';

function DeckCardQuantity(props) {
  let q;
  if (props.q == 0) {
    q = null;
  } else {
    q = props.q;
  }

  return (
    <div className='d-flex align-items-center justify-content-between'>

      <Button variant='outline-secondary' onClick={e => props.deckCardChange(props.deckid, props.cardid, q + 1)}>
        <Plus size={16} />
      </Button>
      {q}
      <Button variant='outline-secondary' onClick={e => props.deckCardChange(props.deckid, props.cardid, q - 1)}>
        <Dash size={16} />
      </Button>
    </div>
  );
}

export default DeckCardQuantity;
