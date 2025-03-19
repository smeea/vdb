import { twMerge } from 'tailwind-merge';
import PinAngleFill from '@icons/pin-angle-fill.svg?react';
import Shuffle from '@icons/shuffle.svg?react';
import { ID, S } from '@/constants';
import { cardToggleInventoryState } from '@/context';

const DeckCardToggleInventoryStateTd = ({ card, isEditable, deckid, inventoryType }) => {
  return (
    <td className="group max-w-0">
      <div className="relative flex items-center">
        <div
          className={twMerge(
            'absolute left-[-24px]',
            !card.i && 'opacity-0',
            !card.i && isEditable && 'group-hover:opacity-[0.35]',
          )}
          onClick={() => isEditable && cardToggleInventoryState(deckid, card.c[ID])}
        >
          {inventoryType == S ? <PinAngleFill /> : <Shuffle />}
        </div>
      </div>
    </td>
  );
};

export default DeckCardToggleInventoryStateTd;
