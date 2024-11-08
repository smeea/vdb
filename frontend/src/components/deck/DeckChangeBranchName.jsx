import React, { useState, useEffect } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import PaletteFill from '@/assets/images/icons/palette-fill.svg?react';
import { Input, InputLabel, Button } from '@/components';
import { getIsEditable } from '@/utils';
import { deckUpdate } from '@/context';
import { BRANCH_NAME, DECKID, IS_AUTHOR } from '@/constants';

const DeckChangeBranchName = ({ deck }) => {
  const [value, setValue] = useState(deck[BRANCH_NAME] || '');
  const [success, setSuccess] = useState(false);
  const isEditable = getIsEditable(deck);

  useEffect(() => {
    if (value !== deck[BRANCH_NAME]) setValue(deck[BRANCH_NAME] ?? '');
  }, [deck[BRANCH_NAME]]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(deck[DECKID], BRANCH_NAME, value);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    deckChangeBranchName();
  };

  const handleOnBlur = () => {
    if (value != deck[BRANCH_NAME]) {
      deckChangeBranchName();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <InputLabel className="sm:hidden" title="Branch Name">
        <PaletteFill width="20" height="20" viewBox="0 0 16 16" />
      </InputLabel>
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        roundedStyle="rounded max-sm:rounded-none"
      />
      {deck[IS_AUTHOR] && (
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

export default DeckChangeBranchName;
