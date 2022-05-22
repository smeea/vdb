import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useApp } from 'context';
import DeckFreezeButton from './DeckFreezeButton';

const DeckChangeName = ({ deck, isAuthor, isPublic }) => {
  const { deckUpdate, isMobile } = useApp();
  const [state, setState] = useState('');
  const [buttonState, setButtonState] = useState(false);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(deck.deckid, 'name', state);
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
    if (state != name) {
      deckChangeName();
    }
  };

  useEffect(() => {
    setState(name);
  }, [name]);

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
          readOnly={!isAuthor || isPublic}
        />
        {(isPublic || deck.deckid.length != 32) && (
          <InputGroup.Text
            title={isPublic ? 'Public Deck' : 'Tournament-Winning Deck'}
          >
            {isPublic ? <PeopleFill /> : <TrophyFill />}
          </InputGroup.Text>
        )}
        {isAuthor && !isPublic && <DeckFreezeButton deck={deck} inName />}
        {isMobile && isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default DeckChangeName;
