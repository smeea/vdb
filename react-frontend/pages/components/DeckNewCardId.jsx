import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function DeckNewCardId(props) {
  const [state, setState] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setState(value);
  };

  const clearFormButton = event => {
    setState('');
  };

  const createNewCard = event => {
    if (state > 100000 && state < 202000) {
      props.deckCardAdd(props.deckid, state);
    } else if (state) {
      console.log('Error: wrong card id');
    } else {
      console.log('Error: submit with empty forms');
    };
  };

  return (
    <React.Fragment>
      <input
        placeholder='New Card Id'
        type='text'
        value={state}
        onChange={handleChange} />
      <Button variant='outline-primary' onClick={createNewCard}>
        Add
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </React.Fragment>
  );
}

export default DeckNewCardId;
