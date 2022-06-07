import React from 'react';
import LockFill from 'assets/images/icons/lock-fill.svg';
import UnlockFill from 'assets/images/icons/unlock-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckFreezeButton = ({ deck, inName }) => {
  const { deckUpdate } = useApp();

  const handleClick = () => {
    deckUpdate(deck.deckid, 'frozen', !deck.frozen);
  };

  return (
    <ButtonIconed
      variant="primary"
      onClick={handleClick}
      title={`${deck.frozen ? 'Disabled' : 'Enabled'} Crypt/Library Editing`}
      icon={
        deck.frozen ? (
          <LockFill width="16" height="23" viewBox="0 0 16 16" />
        ) : (
          <UnlockFill width="16" height="23" viewBox="0 0 16 16" />
        )
      }
    />
  );
};

export default DeckFreezeButton;
