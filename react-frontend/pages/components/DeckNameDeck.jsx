import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckNameDeck(props) {
  const [state, setState] = useState(props.name);

  const handleChange = event => {
    setState(event.target.value);
  };

  const deckNameButton = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'name', state);
    } else {
      console.log('Error: submit with empty form');
    };
  };

  useEffect(() => {
    setState(props.name);
  }, [props.name]);

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Deck Name
        </span>
      </div>
      <input type="text"
             className="form-control"
             placeholder="Deck Name"
             value={state}
             onChange={handleChange}
      />
      <Button variant='outline-secondary' onClick={deckNameButton}>
        Rename
      </Button>
    </div>
  );
}

export default DeckNameDeck;
