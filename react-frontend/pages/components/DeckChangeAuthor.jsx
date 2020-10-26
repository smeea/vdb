import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckChangeAuthor(props) {
  const [state, setState] = useState('');

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
    props.author && setState(props.author);
  }, [props.author]);

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Author</InputGroup.Text>
      </InputGroup.Prepend>
      {props.isAuthor ? (
        <FormControl
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
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleButton}>
            <Check2 size={20} />
          </Button>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
}

export default DeckChangeAuthor;
