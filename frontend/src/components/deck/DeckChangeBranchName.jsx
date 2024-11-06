import React, { useState, useEffect } from 'react';
import Check2 from '@/assets/images/icons/check2.svg?react';
import PaletteFill from '@/assets/images/icons/palette-fill.svg?react';
import { Input, InputLabel, Button } from '@/components';
import { deckUpdate } from '@/context';

const DeckChangeBranchName = ({ deck }) => {
  const { deckid, branchName, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(branchName || '');
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== branchName) setValue(branchName ?? '');
  }, [branchName]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(deckid, BRANCH_NAME, value);
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
    if (value != branchName) {
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

export default DeckChangeBranchName;
