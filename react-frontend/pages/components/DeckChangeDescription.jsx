import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';

function DeckDescription(props) {
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeDescription = () => {
    props.deckUpdate(props.deckid, 'description', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
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
            rows={5}
            type="text"
            className="form-control"
            value={state}
            onChange={handleChange}
          />
        ) : (
          <FormControl
            as="textarea"
            rows={5}
            type="text"
            className="form-control"
            value={state}
            onChange={handleChange}
            readOnly
            style={{ background: 'white' }}
          />
        )}
        {props.isAuthor && (
          <InputGroup.Append>
            {!buttonState ? (
              <Button variant="outline-secondary" type="submit">
                <Check2 />
              </Button>
            ) : (
              <Button variant="success" type="submit">
                <Check2 />
              </Button>
            )}
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckDescription;
