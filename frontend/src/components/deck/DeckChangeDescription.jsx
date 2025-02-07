import { useEffect, useState } from 'react';
import ChatLeftQuoteFill from '@icons/chat-left-quote-fill.svg?react';
import ChevronBarContract from '@icons/chevron-bar-contract.svg?react';
import ChevronBarExpand from '@icons/chevron-bar-expand.svg?react';
import { Button, Input, InputLabel, Textarea } from '@/components';
import { DECKID, DESCRIPTION } from '@/constants';
import { deckUpdate } from '@/context';
import { getIsEditable } from '@/utils';

const DeckDescription = ({ deck, isFolded, setIsFolded }) => {
  const [value, setValue] = useState(deck[DESCRIPTION] || '');
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (value !== deck[DESCRIPTION]) setValue(deck[DESCRIPTION] ?? '');
  }, [deck[DESCRIPTION]]);

  const handleChange = (event) => {
    setValue(isFolded ? value.replace(/.*/, event.target.value) : event.target.value);
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
        <ChatLeftQuoteFill width="17" height="17" viewBox="0 0 16 16" />
      </InputLabel>
      {isFolded ? (
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
        onClick={() => setIsFolded(!isFolded)}
      >
        {isFolded ? (
          <ChevronBarExpand width="19" height="19" viewBox="0 0 16 16" />
        ) : (
          <ChevronBarContract width="19" height="19" viewBox="0 0 16 16" />
        )}
      </Button>
    </form>
  );
};

export default DeckDescription;
