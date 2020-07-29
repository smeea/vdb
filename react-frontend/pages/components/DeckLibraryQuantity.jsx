import React from 'react';

function DeckLibraryQuantity(props) {
  const deckCardChange = props.deckCardChange;
  const deckid = props.deckid;
  const cardid = props.cardid;
  let q = 0;
  if (props.q == 0) {
    q = null;
  } else {
    q = props.q;
  }

  return (
    <td className='quantity'>
      <div className='d-flex align-items-center justify-content-between'>
        <button className="btn btn-outline-secondary" type="button" onClick={(e) => deckCardChange(deckid, cardid, q + 1)}>
          +
        </button>
        {' '}{q}{' '}
        <button className="btn btn-outline-secondary" type="button" onClick={(e) => deckCardChange(deckid, cardid, q - 1)}>
          -
        </button>
      </div>
    </td>
  );
}

export default DeckLibraryQuantity;
