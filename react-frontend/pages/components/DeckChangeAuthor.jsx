import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import PersonFill from '../../assets/images/icons/person-fill.svg';

function DeckChangeAuthor(props) {
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeAuthor = () => {
    props.deckUpdate(props.deckid, 'author', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeAuthor();
  };

  const handleOnBlur = () => {
    if (state != props.author) {
      deckChangeAuthor();
    }
  };

  useEffect(() => {
    setState(props.author);
  }, [props.author]);

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>
            <PersonFill />
          </InputGroup.Text>
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
            <Button
              variant={buttonState ? 'success' : 'outline-secondary'}
              type="submit"
            >
              <Check2 />
            </Button>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckChangeAuthor;
