import React, { useState, useEffect } from 'react';
import Snow from '@/assets/images/icons/snow.svg?react';
import TagFill from '@/assets/images/icons/tag-fill.svg?react';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import { deckUpdate } from '@/context';
import { Input, InputLabel, DeckFreezeButton } from '@/components';

const DeckChangeName = ({ deck }) => {
  const { isPublic, isAuthor, isFrozen, isNonEditable } = deck;
  const [value, setValue] = useState(deck.name || '');
  const isEditable = isAuthor && !isPublic && !isFrozen && !isNonEditable;

  useEffect(() => {
    if (value !== deck.name) setValue(deck.name ?? '');
  }, [deck.name]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(deck.deckid, 'name', value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeName();
  };

  const handleOnBlur = () => {
    if (value != deck.name) {
      deckChangeName();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputLabel title="Deck Name">
        <TagFill width="20" height="20" viewBox="0 0 16 16" />
      </InputLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        roundedStyle={
          isAuthor ||
          isNonEditable ||
          isPublic ||
          (deck.deckid !== 'deck' && deck.deckid.length !== 32 && !deck.deckid.includes(':'))
            ? ''
            : 'rounded-r'
        }
        borderStyle={`border-y
          ${
            isAuthor ||
            isNonEditable ||
            isPublic ||
            (deck.deckid !== 'deck' && deck.deckid.length !== 32 && !deck.deckid.includes(':'))
              ? ''
              : 'border-r'
          }`}
      />
      {(isPublic ||
        (deck.deckid !== 'deck' && deck.deckid.length !== 32 && !deck.deckid.includes(':'))) && (
        <InputLabel title={isPublic ? 'Public Deck' : 'Tournament Winning Deck'} isEnd>
          {isPublic ? <PeopleFill /> : <TrophyFill />}
        </InputLabel>
      )}
      {isNonEditable && (
        <InputLabel title="Deck is non-editable and will never change" isEnd>
          <Snow width="16" height="23" viewBox="0 0 16 16" />
        </InputLabel>
      )}
      {isAuthor && !isPublic && (
        <DeckFreezeButton
          roundedStyle="rounded-r"
          borderStyle="border-l border-y sm:border-r"
          deck={deck}
        />
      )}
    </form>
  );
};

export default DeckChangeName;
