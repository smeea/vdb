import React from 'react';
import Snow from 'assets/images/icons/snow.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckFreezeButton = ({ deckid, inName }) => {
  const { decks, deckUpdate } = useApp();
  const deck = decks[deckid];

  const handleClick = () => {
    deckUpdate(deckid, 'frozen', !deck.frozen);
  };

  return (
    <ButtonIconed
      variant={deck.frozen ? 'third' : inName ? 'secondary' : 'primary'}
      onClick={handleClick}
      title={`${deck.frozen ? 'Disabled' : 'Enabled'} Crypt/Library Edition`}
      icon={
        <Snow
          className={deck.frozen ? '' : 'gray'}
          width="16"
          height="23"
          viewBox="0 0 16 16"
        />
      }
    />
  );
};

export default DeckFreezeButton;
