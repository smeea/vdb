import React from 'react';
import { Button } from '@/components';
import LockFill from '@/assets/images/icons/lock-fill.svg';
import UnlockFill from '@/assets/images/icons/unlock-fill.svg';
import { deckUpdate } from '@/context';

const DeckFreezeButton = ({ deck, className }) => {
  const handleClick = () => {
    deckUpdate(deck.deckid, 'isFrozen', !deck.isFrozen);
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      title={`${deck.isFrozen ? 'Disabled' : 'Enabled'} Crypt/Library Editing`}
      className={className}
    >
      <>
        {deck.isFrozen ? (
          <LockFill width="18" height="23" viewBox="0 0 16 16" />
        ) : (
          <UnlockFill width="18" height="23" viewBox="0 0 16 16" />
        )}
      </>
    </Button>
  );
};

export default DeckFreezeButton;
