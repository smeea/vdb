import React from 'react';
import { useSnapshot } from 'valtio';
import PlusLg from '@/assets/images/icons/plus-lg.svg?react';
import { Button } from '@/components';
import { deckStore, deckCardChange } from '@/context';

const ButtonAddCard = ({ deckid, card, inDeck, inQuick }) => {
  const decks = useSnapshot(deckStore).decks;

  const handleClick = () => {
    deckCardChange(deckid, card, inDeck + 1);
  };

  let title = 'Add to Deck';
  if (inQuick && decks?.[deckid]) {
    title = inDeck
      ? `In deck "${decks[deckid].name}"`
      : `Add to Deck "${decks[deckid].name}"`;
  }

  return (
    <Button
      className="h-[33px] w-[24px]"
      variant={inDeck ? 'third' : 'primary'}
      onClick={handleClick}
      title={title}
      noPadding
    >
      {inDeck ? inDeck : <PlusLg width="15" height="15" viewBox="0 0 16 16" />}
    </Button>
  );
};

export default ButtonAddCard;
