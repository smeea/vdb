import React from 'react';
import { useSnapshot } from 'valtio';
import ArchiveFill from '@icons/archive-fill.svg?react';
import CalculatorFill from '@icons/calculator-fill.svg?react';
import ChatLeftQuoteFill from '@icons/chat-left-quote-fill.svg?react';
import { Hr, UsedDescription } from '@/components';
import { deckStore, usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';
import { SOFT, HARD, CRYPT, LIBRARY, DECKS } from '@/constants';

const UsedPopover = ({ cardid }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const usedCards = cardid > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards[SOFT][cardid]);
  const hardUsedTotal = getHardTotal(usedCards[HARD][cardid]);
  let inInventory = cardid > 200000 ? inventoryCrypt[cardid]?.q : inventoryLibrary[cardid]?.q;
  const text = cardid > 200000 ? inventoryCrypt[cardid]?.t : inventoryLibrary[cardid]?.t;
  if (!inInventory) inInventory = 0;

  return (
    <div className="flex max-w-[250px] flex-col gap-1">
      {(softUsedMax !== 0 || hardUsedTotal !== 0) && (
        <>
          {softUsedMax > 0 && (
            <UsedDescription usedCards={usedCards[SOFT][cardid]} decks={decks} inventoryType="s" />
          )}
          {hardUsedTotal > 0 && (
            <UsedDescription usedCards={usedCards[HARD][cardid]} decks={decks} inventoryType="h" />
          )}
          <Hr />
        </>
      )}
      <div className="flex items-center gap-1">
        <div className="opacity-40">
          <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <b>{softUsedMax + hardUsedTotal}</b>
        <div>- Total Used</div>
      </div>
      <div className="flex items-center gap-1">
        <div className="opacity-40">
          <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <b>{inInventory}</b>
        <div>- In Inventory</div>
      </div>
      {text && (
        <>
          <Hr />
          <div className="items-top flex gap-1.5">
            <div className="pt-1 opacity-40">
              <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <div className="text-sm">{text}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsedPopover;
