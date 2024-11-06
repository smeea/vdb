import React, { useState, useEffect } from 'react';
import Snow from '@/assets/images/icons/snow.svg?react';
import TagFill from '@/assets/images/icons/tag-fill.svg?react';
import PeopleFill from '@/assets/images/icons/people-fill.svg?react';
import TrophyFill from '@/assets/images/icons/trophy-fill.svg?react';
import { deckUpdate } from '@/context';
import { Input, InputLabel, DeckFreezeButton } from '@/components';

const DeckChangeName = ({ deck }) => {
  const [value, setValue] = useState(deck[NAME] || '');
  const isEditable = getIsEditable(deck);
  const isTwd = deck[DECKID] !== 'deck' && deck[DECKID].length !== 9 && !deck[DECKID].includes(':');

  useEffect(() => {
    if (value !== deck[NAME]) setValue(deck[NAME] ?? '');
  }, [deck[NAME]]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(deck[DECKID], NAME, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeName();
  };

  const handleOnBlur = () => {
    if (value != deck[NAME]) {
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
          deck[IS_AUTHOR] || deck[IS_NON_EDITABLE] || deck[IS_PUBLIC] || isTwd ? '' : 'rounded-r'
        }
        borderStyle={`border-y
          ${deck[IS_AUTHOR] || deck[IS_NON_EDITABLE] || deck[IS_PUBLIC] || isTwd ? '' : 'border-r'}`}
      />
      {(deck[IS_PUBLIC] || isTwd) && (
        <InputLabel title={deck[IS_PUBLIC] ? 'Public Deck' : 'Tournament Winning Deck'} isLast>
          {deck[IS_PUBLIC] ? <PeopleFill /> : <TrophyFill />}
        </InputLabel>
      )}
      {deck[IS_NON_EDITABLE] && (
        <InputLabel title="Deck is non-editable and will never change" isLast>
          <Snow width="16" height="23" viewBox="0 0 16 16" />
        </InputLabel>
      )}
      {deck[IS_AUTHOR] && !deck[IS_PUBLIC] && (
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
