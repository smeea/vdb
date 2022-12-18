import React, { useState, useEffect } from 'react';
import Check2 from 'assets/images/icons/check2.svg';
import PaletteFill from 'assets/images/icons/palette-fill.svg';
import { Input, Button } from 'components';
import { useApp, deckUpdate } from 'context';

const DeckChangeBranchName = ({ deck }) => {
  const { isMobile } = useApp();
  const { deckid, branchName, isAuthor, isPublic, isFrozen } = deck;
  const [value, setValue] = useState(branchName);
  const [success, setSuccess] = useState(false);
  const isEditable = isAuthor && !isPublic && !isFrozen;

  useEffect(() => {
    if (value !== branchName) setValue(branchName);
  }, [branchName]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const deckChangeBranchName = () => {
    deckUpdate(deckid, 'branchName', value);
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
      {isMobile && <PaletteFill />}
      <Input
        value={value}
        onChange={handleChange}
        onBlur={handleOnBlur}
        readOnly={!isEditable}
        className={`w-full ${isMobile ? 'rounded-r-none' : ''}`}
      />
      {isMobile && isAuthor && (
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

export default DeckChangeBranchName;
