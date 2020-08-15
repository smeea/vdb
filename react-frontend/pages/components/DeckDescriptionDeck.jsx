import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  const handleChange = event => {
    setState(event.target.value);
  };

  const clearFormButton = event => {
    setState('');
  };

  const deckDescriptionButton = event => {
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
      <Button variant='outline-primary' onClick={deckDescriptionButton}>
        Update
      </Button>
      <Button variant='outline-primary' onClick={clearFormButton}>
        Clear
      </Button>
    </React.Fragment>
  );
}

export default DeckDescriptionDeck;
