import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function DeckChangeName(props) {
  const [state, setState] = useState(props.name);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckNameButton = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'name', state);
    } else {
      console.log('Error: submit with empty form');
    }
  };

  useEffect(() => {
    setState(props.name);
  }, [props.name]);

  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <span className="input-group-text">Name</span>
      </div>
      {props.isAuthor ? (
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={state}
          onChange={handleChange}
        />
      ) : (
        <div className="form-control">{state}</div>
      )}
      {props.isAuthor && (
        <Button variant="outline-secondary" onClick={deckNameButton}>
          Rename
        </Button>
      )}
    </div>
  );
}

export default DeckChangeName;
