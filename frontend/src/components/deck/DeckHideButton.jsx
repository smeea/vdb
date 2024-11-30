import React from 'react';
import LightbulbFill from '@icons/lightbulb-fill.svg?react';
import LightbulbOffFill from '@icons/lightbulb-off-fill.svg?react';
import { deckUpdate } from '@/context';
import { ButtonIconed } from '@/components';
import { DECKID, IS_HIDDEN } from '@/constants';

const DeckHideButton = ({ deck }) => {
  const handleClick = () => {
    deckUpdate(deck[DECKID], IS_HIDDEN, !deck[IS_HIDDEN]);
  };

  return (
    <ButtonIconed
      onClick={handleClick}
      title={`${deck[IS_HIDDEN] ? 'Hidden' : 'Shown'} in Deck Selector`}
      icon={
        deck[IS_HIDDEN] ? (
          <LightbulbOffFill width="16" height="23" viewBox="0 0 16 16" />
        ) : (
          <LightbulbFill width="16" height="23" viewBox="0 0 16 16" />
        )
      }
    />
  );
};

export default DeckHideButton;
