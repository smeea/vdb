import React from 'react';

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
        <button className='btn btn-outline-secondary' type='button' onClick={(e) => props.deckCardChange(props.deckid, props.cardid, q + 1)}>
          +
        </button>
        {' '}{q}{' '}
        <button className='btn btn-outline-secondary' type='button' onClick={(e) => props.deckCardChange(props.deckid, props.cardid, q - 1)}>
          -
        </button>
      </div>
    </td>
  );
}

export default DeckCardQuantity;
