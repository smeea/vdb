import React from 'react';
import Snow from 'assets/images/icons/snow.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckFreezeButton = ({ deck, inName }) => {
  const { deckUpdate } = useApp();

  const handleClick = () => {
    deckUpdate(deck.deckid, 'frozen', !deck.frozen);
  };

  return (
    <ButtonIconed
      variant={
        deck.frozen || deck.non_editable
          ? 'third'
          : inName
          ? 'secondary'
          : 'primary'
      }
      onClick={handleClick}
      title={`${deck.frozen ? 'Disabled' : 'Enabled'} Crypt/Library Edition`}
      disabled={deck.non_editable}
      icon={
        <Snow
          className={deck.frozen || deck.non_editable ? '' : 'gray'}
          width="16"
          height="23"
          viewBox="0 0 16 16"
        />
      }
    />
  );
};

export default DeckFreezeButton;
