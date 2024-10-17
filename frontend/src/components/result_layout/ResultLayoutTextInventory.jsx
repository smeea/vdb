import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import ArchiveFill from '@/assets/images/icons/archive-fill.svg?react';
import CalculatorFill from '@/assets/images/icons/calculator-fill.svg?react';
import { InventoryText, UsedDescription } from '@/components';
import { inventoryStore, usedStore, deckStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';
import { SOFT, HARD, CRYPT, LIBRARY, DECKS } from '@/utils/constants';

const ResultLayoutTextInventory = ({ card, inPopover }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const usedCards = card.Id > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards[SOFT][card.Id]);
  const hardUsedTotal = getHardTotal(usedCards[HARD][card.Id]);
  const inInventory =
    card.Id > 200000 ? inventoryCrypt[card.Id]?.q || 0 : inventoryLibrary[card.Id]?.q || 0;
  const text = card.Id > 200000 ? inventoryCrypt[card.Id]?.t : inventoryLibrary[card.Id]?.t;

  return (
    <div className="flex flex-col gap-1.5">
      <div className={twMerge('flex gap-1.5', inPopover ? 'flex-col' : 'max-md:flex-col')}>
        <div className="flex basis-full flex-col gap-0.5 md:basis-1/3">
          <div className="flex items-center gap-1.5">
            <div className="opacity-40">
              <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <b>{softUsedMax + hardUsedTotal}</b>
            <div>- Total Used</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="opacity-40">
              <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <b>{inInventory}</b>
            <div>- In Inventory</div>
          </div>
        </div>
        {(softUsedMax > 0 || hardUsedTotal > 0) && (
          <>
            <div className="flex basis-full flex-col gap-0.5 md:basis-2/3">
              {softUsedMax > 0 && (
                <UsedDescription
                  usedCards={usedCards[SOFT][card.Id]}
                  decks={decks}
                  inventoryType="s"
                />
              )}
              {hardUsedTotal > 0 && (
                <UsedDescription
                  usedCards={usedCards[HARD][card.Id]}
                  decks={decks}
                  inventoryType="h"
                />
              )}
            </div>
          </>
        )}
      </div>
      {(!inPopover || text) && <InventoryText text={text} card={card} inPopover={inPopover} />}
    </div>
  );
};

export default ResultLayoutTextInventory;
