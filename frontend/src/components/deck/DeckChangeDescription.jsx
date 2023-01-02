import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import ChevronBarExpand from 'assets/images/icons/chevron-bar-expand.svg';
import ChevronBarContract from 'assets/images/icons/chevron-bar-contract.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import { Input, Textarea, Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckDescription = ({ deck, folded, setFolded }) => {
  const { isMobile } = useApp();
  const { deckid, description, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(description);
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== description) setValue(description);
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
      <div
        className="bg-bgSecondary dark:bg-bgSecondaryDark border border-bgSecondary dark:border-bgSecondaryDark text-fgThird dark:text-fgThirdDark flex items-center rounded-l p-2"
        title="Description"
      >
        <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
      </div>
      {folded ? (
        <Input
          value={value}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
          className="rounded-none border-bgSecondary dark:border-bgSecondaryDark"
        />
      ) : (
        <Textarea
          className="w-full rounded-none"
          rows={12}
          value={value}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
      )}
      {!isMobile && (
        <Button
          className="rounded-l-none"
          title="Collapse/Uncollapse Description"
          variant="primary"
          onClick={() => setFolded(!folded)}
        >
          {folded ? <ChevronBarExpand /> : <ChevronBarContract />}
        </Button>
      )}
      {isMobile && isAuthor && (
        <Button variant={success ? 'success' : 'primary'} type="submit">
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckDescription;
