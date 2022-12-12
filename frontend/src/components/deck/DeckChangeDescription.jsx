import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import ChevronBarExpand from 'assets/images/icons/chevron-bar-expand.svg';
import ChevronBarContract from 'assets/images/icons/chevron-bar-contract.svg';
import ChatLeftQuoteFill from 'assets/images/icons/chat-left-quote-fill.svg';
import { Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckDescription = ({ deck, folded, setFolded }) => {
  const { isMobile } = useApp();
  const { deckid, description, isAuthor, isPublic, isFrozen } = deck;
  const [state, setState] = useState(description);
  const [buttonState, setButtonState] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (state !== description) setState(description);
  }, [description]);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const deckChangeDescription = () => {
    deckUpdate(deckid, 'description', state);
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 1000);
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    deckChangeDescription();
  };

  const handleOnBlur = () => {
    if (state !== description) {
      deckChangeDescription();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmitButton}>
      <div
        className="flex items-center rounded-l bg-red-900 p-2"
        title="Description"
      >
        <ChatLeftQuoteFill width="20" height="18" viewBox="0 0 16 16" />
      </div>
      {folded ? (
        <input
          className={`${
            folded ? '' : 'w-full'
          } px-1.5 py-1 border-2 border-red-400 bg-blue-900`}
          type="text"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
      ) : (
        <textarea
          className={`${
            folded ? '' : 'w-full'
          } px-1.5 py-1 border-2 border-red-400 bg-blue-900`}
          rows={12}
          type="text"
          value={state}
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
        <Button variant={buttonState ? 'success' : 'primary'} type="submit">
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckDescription;
