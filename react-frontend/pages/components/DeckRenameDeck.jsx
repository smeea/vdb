import React, { useState } from 'react';

function DeckRenameDeck(props) {
  const [state, setState] = useState({
    name: props.name,
  });

  const handleChange = event => {
    const {id, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const clearFormButton = event => {
    setState({name: ''});
  };

  const deckRenameButton = event => {
    if (state.name) {
      props.deckUpdate(props.deckid, 'name', state.name);
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
        value={state.name}
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
