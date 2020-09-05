import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = () => {
    setState('');
  };

  const deckDescriptionButton = () => {
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
    <>
      <textarea value={state} onChange={handleChange} />
      <Button variant='outline-primary' onClick={deckDescriptionButton}>
        Update
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </>
  );
}

export default DeckDescriptionDeck;
