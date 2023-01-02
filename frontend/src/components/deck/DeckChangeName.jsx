import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import Snow from 'assets/images/icons/snow.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { useApp, deckUpdate } from 'context';
import { Input, Button, DeckFreezeButton } from 'components';

const DeckChangeName = ({ deck }) => {
  const { isMobile } = useApp();
  const { isPublic, isAuthor, isFrozen, isNonEditable } = deck;
  const [value, setValue] = useState(deck.name);
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== deck.name) setValue(deck.name);
  }, [deck.name]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeName = () => {
    deckUpdate(deck.deckid, 'name', value);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
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
      <div
        className="bg-bgSecondary dark:bg-bgSecondaryDark border border-bgSecondary dark:border-bgSecondaryDark text-fgThird dark:text-fgThirdDark flex items-center rounded-l p-2"
        title="Deck Name"
      >
        <TagFill width="20" height="20" viewBox="0 0 16 16" />
      </div>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        className="w-full rounded-none border-bgSecondary dark:border-bgSecondaryDark"
      />
      {(isPublic ||
        (deck.deckid !== 'deck' &&
          deck.deckid.length !== 32 &&
          !deck.deckid.includes(':'))) && (
        <div
          className="rounded-l-none"
          title={isPublic ? 'Public Deck' : 'Tournament-Winning Deck'}
        >
          {isPublic ? <PeopleFill /> : <TrophyFill />}
        </div>
      )}
      {isNonEditable && (
        <div
          title="Deck is non-editable and will never change"
          className="rounded-l-none"
        >
          <Snow width="16" height="23" viewBox="0 0 16 16" />
        </div>
      )}
      {isAuthor && !isPublic && (
        <DeckFreezeButton className="rounded-l-none" deck={deck} />
      )}
      {isMobile && isEditable && (
        <Button
          className="rounded-l-none"
          variant={success ? 'success' : 'primary'}
          type="submit"
        >
          <Check2 />
        </Button>
      )}
    </form>
  );
};

export default DeckChangeName;
