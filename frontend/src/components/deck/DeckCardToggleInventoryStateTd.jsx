import React from 'react';
import { twMerge } from 'tailwind-merge';
import Shuffle from '@/assets/images/icons/shuffle.svg?react';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg?react';
import { cardToggleInventoryState } from '@/context';

const DeckCardToggleInventoryStateTd = ({ card, deck }) => {
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  return (
    <td className="group max-w-0">
      <div className="relative flex items-center">
        <div
          className={twMerge(
            'absolute left-[-24px]',
            card.i ? '' : isEditable ? 'opacity-0 group-hover:opacity-[0.35]' : 'opacity-0',
          )}
          onClick={() => isEditable && cardToggleInventoryState(deckid, card.c.Id)}
        >
          {deck.inventoryType == 's' ? <PinAngleFill /> : <Shuffle />}
        </div>
      </div>
    </td>
  );
};

export default DeckCardToggleInventoryStateTd;
