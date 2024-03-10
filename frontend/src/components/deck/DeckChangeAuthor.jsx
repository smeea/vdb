import React, { useState, useEffect } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { Input, InputLabel, Button } from '@/components';
import { deckUpdate } from '@/context';

const DeckChangeAuthor = ({ deck }) => {
  const { deckid, author, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(author || '');
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== author) setValue(author ?? '');
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
      <InputLabel title="Author">
        <PersonFill width="20" height="20" viewBox="0 0 16 16" />
      </InputLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        roundedStyle={`rounded rounded-l-none
          ${isAuthor ? 'max-sm:rounded-r-none' : ''}`}
        borderStyle={`border-y sm:border-r
          ${isAuthor ? '' : 'max-sm:border-r'}`}
      />
      {isAuthor && (
        <Button
          className="rounded-l-none sm:hidden"
          variant={success ? 'success' : 'primary'}
          type="submit"
        >
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckChangeAuthor;
