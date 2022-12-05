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
    <form className="my-0" onSubmit={handleSubmitButton}>
      <div className="input-group">
        <div title="Description">
          <ChatLeftQuoteFill />
        </div>
        <input
          as={folded ? 'input' : 'textarea'}
          rows={12}
          type="text"
          className="form-control"
          value={state}
          onChange={handleChange}
          onBlur={handleOnBlur}
          readOnly={!isEditable}
        />
        {!isMobile && (
          <Button
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
      </div>
    </form>
  );
};

export default DeckDescription;
