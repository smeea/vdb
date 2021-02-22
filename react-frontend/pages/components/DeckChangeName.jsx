import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import StarFill from '../../assets/images/icons/star-fill.svg';

function DeckChangeName(props) {
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeName = () => {
    props.deckUpdate(props.deckid, 'name', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeName();
  };

  const handleOnBlur = () => {
    if (state != props.name) {
      deckChangeName();
    };
  };

  useEffect(() => {
    setState(props.name);
  }, [props.name]);

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text><StarFill /></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!props.isAuthor}
          style={{ background: 'white' }}
        />
        {props.isMobile && props.isAuthor && (
          <InputGroup.Append>
            <Button variant={buttonState ? "success" : "outline-secondary"} type="submit">
              <Check2 />
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckChangeName;
