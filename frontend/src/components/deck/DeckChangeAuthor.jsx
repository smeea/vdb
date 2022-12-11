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
    <form className="flex" onSubmit={handleSubmitButton}>
      <div
        className="flex items-center rounded-l bg-red-900 px-2 py-1"
        title="Author"
      >
        <PersonFill width="22" height="22" viewBox="0 0 16 16" />
      </div>
      <Input
        value={state}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        className="w-full rounded-l-none"
      />
      {isMobile && isAuthor && (
        <Button variant={buttonState ? 'success' : 'primary'} type="submit">
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckChangeAuthor;
