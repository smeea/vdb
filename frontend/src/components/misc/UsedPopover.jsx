import React from 'react';
import { useSnapshot } from 'valtio';
import ArchiveFill from '@/assets/images/icons/archive-fill.svg?react';
import CalculatorFill from '@/assets/images/icons/calculator-fill.svg?react';
import ChatLeftQuoteFill from '@/assets/images/icons/chat-left-quote-fill.svg?react';
import { Hr, UsedDescription } from '@/components';
import { deckStore, usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

const UsedPopover = ({ cardid }) => {
  const decks = useSnapshot(deckStore).decks;
  const { crypt: usedCrypt, library: usedLibrary } = useSnapshot(usedStore);
  const { crypt: inventoryCrypt, library: inventoryLibrary } = useSnapshot(inventoryStore);
  const usedCards = cardid > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards.soft[cardid]);
  const hardUsedTotal = getHardTotal(usedCards.hard[cardid]);
  let inInventory = cardid > 200000 ? inventoryCrypt[cardid]?.q : inventoryLibrary[cardid]?.q;
  const text = cardid > 200000 ? inventoryCrypt[cardid]?.t : inventoryLibrary[cardid]?.t;
  if (!inInventory) inInventory = 0;

  return (
    <div className="flex flex-col max-w-[250px] gap-1">
      {(softUsedMax !== 0 || hardUsedTotal !== 0) && (
        <>
          {softUsedMax > 0 && (
            <UsedDescription usedCards={usedCards.soft[cardid]} decks={decks} inventoryType="s" />
          )}
          {hardUsedTotal > 0 && (
            <UsedDescription usedCards={usedCards.hard[cardid]} decks={decks} inventoryType="h" />
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
      <div className="flex items-center space-x-1">
        <div className="opacity-40">
          <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <b>{inInventory}</b>
        <div>- In Inventory</div>
      </div>
      {text && (
        <>
          <Hr />
          <div className="flex items-top gap-1.5">
            <div className="opacity-40 pt-1">
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
