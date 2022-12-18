import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { Input, Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckChangeAuthor = ({ deck }) => {
  const { isMobile } = useApp();
  const { deckid, author, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(author);
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== author) setValue(author);
  }, [author]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeAuthor = () => {
    deckUpdate(deckid, 'author', value);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeAuthor();
  };

  const handleOnBlur = () => {
    if (value !== author) {
      deckChangeAuthor();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div
        className="flex items-center rounded-l bg-red-900 p-2"
        title="Author"
      >
        <PersonFill width="20" height="20" viewBox="0 0 16 16" />
      </div>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        className="w-full rounded-l-none"
      />
      {isMobile && isAuthor && (
        <Button variant={success ? 'success' : 'primary'} type="submit">
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckChangeAuthor;
