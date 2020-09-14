import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  const handleChange = event => {
    setState(event.target.value);
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
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          Description
        </span>
      </div>
      <textarea className="form-control"
                value={state}
                onChange={handleChange}
      />
      <Button variant='outline-secondary' onClick={deckDescriptionButton}>
        Update
      </Button>
    </div>
  );
}

export default DeckDescriptionDeck;
