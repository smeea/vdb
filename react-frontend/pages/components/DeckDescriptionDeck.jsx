import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckDescriptionDeck(props) {
  const [state, setState] = useState(props.description);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckDescriptionButton = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'description', state);
    } else {
      console.log('Error: submit with empty form');
    }
  };

  useEffect(() => {
    setState(props.description);
  }, [props.description]);

  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <span className="input-group-text">Description</span>
      </div>
      {props.isAuthor ? (
        <textarea
          className="form-control"
          value={state}
          onChange={handleChange}
        />
      ) : (
        <div className="form-control">{state}</div>
      )}
      {props.isAuthor && (
        <Button variant="outline-secondary" onClick={deckDescriptionButton}>
          Update
        </Button>
      )}
    </div>
  );
}

export default DeckDescriptionDeck;
