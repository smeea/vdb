import React, { useState } from 'react';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState({
    description: props.description,
  });

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const clearFormButton = event => {
    setState({description: ''});
  };

  const deckRenameButton = event => {
    if (state.description) {
      props.deckUpdate(props.deckid, 'description', state.description);
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
        value={state.description}
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
