import React, { useState } from 'react';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  if (state == undefined) {
    setState('');
  }

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = event => {
    setState(null);
  };

  const deckRenameButton = event => {
    if (state) {
      props.deckUpdate(props.deckid, 'description', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  return (
    <React.Fragment>
      <textarea
        placeholder='New Description'
        type='text'
        id='description'
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

export default DeckDescriptionDeck;
