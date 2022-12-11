import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { Input, Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckChangeAuthor = ({ deck }) => {
  const { isMobile } = useApp();
  const { deckid, author, isAuthor, isPublic, isFrozen } = deck;
  const [state, setState] = useState(author);
  const [buttonState, setButtonState] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (state !== author) setState(author);
  }, [author]);

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
    if (state !== author) {
      deckChangeAuthor();
    }
  };

  return (
    <form className="my-0" onSubmit={handleSubmitButton}>
      <div className="input-group">
        <PersonFill />
        <Input
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
        {isMobile && isAuthor && (
          <Button variant={buttonState ? 'success' : 'primary'} type="submit">
            <Check2 />
          </Button>
        )}
      </div>
    </form>
  );
};

export default DeckChangeAuthor;
