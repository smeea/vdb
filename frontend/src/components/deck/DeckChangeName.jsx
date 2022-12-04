import React, { useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Check2 from 'assets/images/icons/check2.svg';
import Snow from 'assets/images/icons/snow.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useApp, deckUpdate } from 'context';
import { Button, DeckFreezeButton } from 'components';

const DeckChangeName = ({ deck }) => {
  const { isMobile } = useApp();
  const { isPublic, isAuthor, isFrozen, isNonEditable } = deck;
  const [state, setState] = useState(deck.name);
  const [buttonState, setButtonState] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (state !== deck.name) setState(deck.name);
  }, [deck.name]);

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
    if (state != deck.name) {
      deckChangeName();
    }
  };

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
          readOnly={!isEditable}
        />
        {(isPublic ||
          (deck.deckid !== 'deck' &&
            deck.deckid.length !== 32 &&
            !deck.deckid.includes(':'))) && (
          <InputGroup.Text
            title={isPublic ? 'Public Deck' : 'Tournament-Winning Deck'}
          >
            {isPublic ? <PeopleFill /> : <TrophyFill />}
          </InputGroup.Text>
        )}
        {isNonEditable && (
          <InputGroup.Text title="Deck is non-editable and will never change">
            <Snow width="16" height="23" viewBox="0 0 16 16" />
          </InputGroup.Text>
        )}
        {isAuthor && !isPublic && <DeckFreezeButton deck={deck} />}

        {isMobile && isEditable && (
          <Button
            variant={buttonState ? 'success' : 'primary'}
            type="submit"
            className="ms-1"
          >
            <Check2 />
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default DeckChangeName;
