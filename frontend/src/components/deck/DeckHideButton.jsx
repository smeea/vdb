import React from 'react';
import LightbulbFill from '@/assets/images/icons/lightbulb-fill.svg?react';
import LightbulbOffFill from '@/assets/images/icons/lightbulb-off-fill.svg?react';
import { deckUpdate } from '@/context';
import { ButtonIconed } from '@/components';

const DeckHideButton = ({ deck }) => {
  const handleClick = () => {
    deckUpdate(deck.deckid, 'isHidden', !deck.isHidden);
  };

  return (
    <ButtonIconed
      variant="primary"
      onClick={handleClick}
      title={`${deck.isHidden ? 'Hidden' : 'Shown'} in Deck Selector`}
      icon={
        deck.isHidden ? (
          <LightbulbOffFill width="16" height="23" viewBox="0 0 16 16" />
        ) : (
          <LightbulbFill width="16" height="23" viewBox="0 0 16 16" />
        )
      }
    />
  );
};

export default DeckHideButton;
