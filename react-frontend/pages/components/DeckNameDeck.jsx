import React, { useState, useEffect } from 'react';

function DeckNameDeck(props) {
  const [state, setState] = useState(props.name);

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = event => {
    setState('');
  };

  const deckNameButton = event => {
    if (state) {
      props.deckUpdate(props.deckid, 'name', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  useEffect(() => {
    setState(props.name);
  });

  return (
    <React.Fragment>
      <textarea value={state} onChange={handleChange} />
      <button className='btn btn-outline-secondary' type='button' onClick={deckNameButton}>
        UPDATE
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={clearFormButton}>
        CLEAR
      </button>
    </React.Fragment>
  );
}

export default DeckNameDeck;
