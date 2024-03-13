import React, { useState, useEffect } from 'react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { Input, InputLabel } from '@/components';
import { deckUpdate } from '@/context';

const DeckChangeAuthor = ({ deck }) => {
  const { deckid, author, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(author || '');
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== author) setValue(author ?? '');
  }, [author]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeAuthor = () => {
    deckUpdate(deckid, 'author', value);
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
        roundedStyle="rounded-r"
        borderStyle="border-r border-y"
      />
    </form>
  );
};

export default DeckChangeAuthor;
