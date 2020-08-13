import React, { useState, useEffect } from 'react';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = event => {
    setState('');
  };

  const deckRenameButton = event => {
    if (state) {
      props.deckUpdate(props.deckid, 'description', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  useEffect(() => {
    setState(props.description);
  }, [props.description]);

  return (
    <React.Fragment>
      <textarea value={state} onChange={handleChange} />
      <button className='btn btn-outline-secondary' type='button' onClick={deckRenameButton}>
        UPDATE
      </button>
      <button className='btn btn-outline-secondary' type='button' onClick={clearFormButton}>
        CLEAR
      </button>
    </React.Fragment>
  );
}

export default DeckDescriptionDeck;
