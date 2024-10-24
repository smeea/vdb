import React from 'react';
import { Button } from '@/components';
import LockFill from '@/assets/images/icons/lock-fill.svg?react';
import UnlockFill from '@/assets/images/icons/unlock-fill.svg?react';
import { deckUpdate } from '@/context';

const DeckFreezeButton = ({ deck, className, roundedStyle, borderStyle }) => {
  const handleClick = () => {
    deckUpdate(deck.deckid, 'isFrozen', !deck.isFrozen);
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      title={`${deck.isFrozen ? 'Disabled' : 'Enabled'} Crypt/Library Editing`}
      className={className}
      roundedStyle={roundedStyle}
      borderStyle={borderStyle}
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
