import React, { useState, useEffect, useContext } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from '../../assets/images/icons/check2.svg';
import StarFill from '../../assets/images/icons/star-fill.svg';
import AppContext from '../../context/AppContext.js';

function DeckChangeName(props) {
  const { deckUpdate, isMobile } = useContext(AppContext);
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(props.deckid, 'name', state);
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
    }
  };

  useEffect(() => {
    setState(props.name);
  }, [props.name]);

  return (
    <Form className="my-0" onSubmit={handleSubmitButton}>
      <InputGroup>
        <InputGroup.Text title="Deck Name">
          <StarFill />
        </InputGroup.Text>
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!props.isAuthor}
        />
        {isMobile && props.isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
}

export default DeckChangeName;
