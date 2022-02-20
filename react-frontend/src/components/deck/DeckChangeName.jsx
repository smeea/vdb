import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useApp } from 'context';

function DeckChangeName(props) {
  const { deckUpdate, isMobile } = useApp();
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
          <TagFill />
        </InputGroup.Text>
        <FormControl
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!props.isAuthor}
        />
        {(props.isPublic || props.deckid.length != 32) && (
          <InputGroup.Text
            title={props.isPublic ? 'Public Deck' : 'Tournament-Winning Deck'}
          >
            <div className="pe-2">
              {props.isPublic ? <PeopleFill /> : <TrophyFill />}
            </div>
            {props.isPublic ? 'PDA' : 'TWD'}
          </InputGroup.Text>
        )}
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
