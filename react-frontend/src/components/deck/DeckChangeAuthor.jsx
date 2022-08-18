import React, { useState } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { useApp } from 'context';

const DeckChangeAuthor = ({ deckid, author, isAuthor, isPublic }) => {
  const { deckUpdate, isMobile } = useApp();

  const [state, setState] = useState(author);
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeAuthor = () => {
    deckUpdate(deckid, 'author', state);
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
    if (state != author) {
      deckChangeAuthor();
    }
  };

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        <InputGroup.Text title="Author">
          <PersonFill />
        </InputGroup.Text>
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isAuthor || isPublic}
        />
        {isMobile && isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default DeckChangeAuthor;
