import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckChangeAuthor(props) {
  const [state, setState] = useState(props.author);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const handleButton = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'author', state);
    } else {
      console.log('Error: submit with empty form');
    }
  };

  useEffect(() => {
    setState(props.author);
  }, [props.author]);

  return (
    <div className="input-group mb-2">
      <div className="input-group-prepend">
        <span className="input-group-text">Author</span>
      </div>
      {props.isAuthor ? (
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          value={state}
          onChange={handleChange}
        />
      ) : (
        <div className="form-control">{state}</div>
      )}
      {props.isAuthor && (
        <Button variant="outline-secondary" onClick={handleButton}>
          <Check2 size={20} />
        </Button>
      )}
    </div>
  );
}

export default DeckChangeAuthor;
