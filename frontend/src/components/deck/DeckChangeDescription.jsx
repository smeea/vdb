import React, { useState, useEffect } from 'react';
import ChevronBarExpand from '@icons/chevron-bar-expand.svg?react';
import ChevronBarContract from '@icons/chevron-bar-contract.svg?react';
import ChatLeftQuoteFill from '@icons/chat-left-quote-fill.svg?react';
import { Input, InputLabel, Textarea, Button } from '@/components';
import { deckUpdate } from '@/context';
import { getIsEditable } from '@/utils';
import { DESCRIPTION, DECKID } from '@/constants';

const DeckDescription = ({ deck, folded, setFolded }) => {
  const [value, setValue] = useState(deck[DESCRIPTION] || '');
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (value !== deck[DESCRIPTION]) setValue(deck[DESCRIPTION] ?? '');
  }, [deck[DESCRIPTION]]);

  const handleChange = (event) => {
    setValue(folded ? value.replace(/.*/, event.target.value) : event.target.value);
  };

  const deckChangeDescription = () => {
    deckUpdate(deck[DECKID], DESCRIPTION, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeDescription();
  };

  const handleOnBlur = () => {
    if (value !== deck[DESCRIPTION]) {
      deckChangeDescription();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputLabel title="Description">
        <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
      </InputLabel>
      {folded ? (
        <Input
          value={value.split('\n', 1)[0]}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
          borderStyle="border-y"
          roundedStyle="rounded-none"
        />
      ) : (
        <Textarea
          className="w-full"
          rows={12}
          value={value}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
          roundedStyle="rounded-none"
          borderStyle="border-y"
        />
      )}
      <Button
        roundedStyle="rounded-r"
        title="Collapse/Uncollapse Description"
        onClick={() => setFolded(!folded)}
      >
        {folded ? <ChevronBarExpand /> : <ChevronBarContract />}
      </Button>
    </form>
  );
};

export default DeckDescription;
