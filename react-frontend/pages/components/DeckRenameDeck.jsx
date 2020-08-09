import React, { useState, useEffect } from 'react';

function DeckRenameDeck(props) {
  const [state, setState] = useState(props.name);

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = event => {
    setState(null);
  };

  const deckRenameButton = event => {
    if (state) {
      props.deckUpdate(props.deckid, 'name', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  return (
    <React.Fragment>
      <input
        placeholder='New Deck Name'
        type='text'
        id='name'
        value={state}
        onChange={handleChange}/>
      <button className='btn btn-outline-secondary' type='button' onClick={deckRenameButton}>
        UPDATE
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={clearFormButton}>
        CLEAR
      </button>
    </React.Fragment>
  );
}

export default DeckRenameDeck;
