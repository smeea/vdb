import React from 'react';
import { Button } from 'react-bootstrap';

function DeckCardQuantity(props) {
  let q;
  if (props.q == 0) {
    q = null;
  } else {
    q = props.q;
  }

  return (
    <td className='quantity'>
      <div className='d-flex align-items-center justify-content-between'>

        <Button variant='outline-primary' onClick={e => props.deckCardChange(props.deckid, props.cardid, q + 1)}>
          +
        </Button>
        {q}
        <Button variant='outline-primary' onClick={e => props.deckCardChange(props.deckid, props.cardid, q - 1)}>
          -
        </Button>
      </div>
    </td>
  );
}

export default DeckCardQuantity;
