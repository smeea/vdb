import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckDescription(props) {
  const [state, setState] = useState(undefined);

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
    <InputGroup className="mb-2">
      <InputGroup.Prepend>
        <InputGroup.Text>
          Description
        </InputGroup.Text>
      </InputGroup.Prepend>
      {props.isAuthor ? (
        <FormControl
          as="textarea"
          className="form-control"
          value={state}
          onChange={handleChange}
        />
      ) : (
        <div className="form-control">{state}</div>
      )}
      {props.isAuthor && (
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={deckDescriptionButton}>
            <Check2 size={20} />
          </Button>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
}

export default DeckDescription;
