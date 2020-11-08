import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckDescription(props) {
  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeDescription = () => {
    if (state) {
      props.deckUpdate(props.deckid, 'description', state);
    } else {
      console.log('Error: submit with empty form');
    }
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeDescription();
  };

  useEffect(() => {
    props.description && setState(props.description);
  }, [props.description]);

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Description</InputGroup.Text>
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
            <Button variant="outline-secondary" type="submit">
              <Check2 size={20} />
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckDescription;
