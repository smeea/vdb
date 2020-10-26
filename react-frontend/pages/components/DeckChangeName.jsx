import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckChangeName(props) {
  const [state, setState] = useState('');

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
    props.name && setState(props.name);
  }, [props.name]);

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Name</InputGroup.Text>
      </InputGroup.Prepend>
      {props.isAuthor ? (
        <FormControl
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
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={deckNameButton}>
            <Check2 size={20} />
          </Button>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
}

export default DeckChangeName;
