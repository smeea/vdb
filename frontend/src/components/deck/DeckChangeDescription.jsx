import React, { useState, useEffect } from 'react';
import Check2 from '@/assets/images/icons/check2.svg';
import ChevronBarExpand from '@/assets/images/icons/chevron-bar-expand.svg';
import ChevronBarContract from '@/assets/images/icons/chevron-bar-contract.svg';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg';
import { Input, InputPreLabel, Textarea, Button } from '@/components';
import { deckUpdate } from '@/context';

const DeckDescription = ({ deck, folded, setFolded }) => {
  const { deckid, description, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(description || '');
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== description && description) setValue(description);
  }, [description]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeDescription = () => {
    deckUpdate(deckid, 'description', value);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeDescription();
  };

  const handleOnBlur = () => {
    if (value !== description) {
      deckChangeDescription();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputPreLabel title="Description">
        <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
      </InputPreLabel>
      {folded ? (
        <Input
          value={value}
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
          borderStyle={
            isAuthor
              ? 'border-y max-sm:border-r rounded-l-none rounded-r-none'
              : 'border-y max-sm:border-r rounded-l-none sm:rounded-r-none'
          }
        />
      )}
      <Button
        className="rounded-l-none max-sm:hidden"
        title="Collapse/Uncollapse Description"
        variant="primary"
        onClick={() => setFolded(!folded)}
      >
        {folded ? <ChevronBarExpand /> : <ChevronBarContract />}
      </Button>
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

export default DeckDescription;
