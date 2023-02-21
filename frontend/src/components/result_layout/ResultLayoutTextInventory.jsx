import React from 'react';
import { useSnapshot } from 'valtio';
import ArchiveFill from '@/assets/images/icons/archive-fill.svg';
import CalculatorFill from '@/assets/images/icons/calculator-fill.svg';
import { UsedDescription } from '@/components';
import { inventoryStore, usedStore, deckStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

const ResultLayoutTextInventory = ({ cardid, inPopover }) => {
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const usedCards = cardid > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards.soft[cardid]);
  const hardUsedTotal = getHardTotal(usedCards.hard[cardid]);
  let inInventory =
    cardid > 200000 ? inventoryCrypt[cardid]?.q : inventoryLibrary[cardid]?.q;
  if (!inInventory) inInventory = 0;

  return (
    <div
      className={`flex ${inPopover ? 'flex-col' : 'max-md:flex-col'} gap-1.5`}
    >
      <div className="basis-full md:basis-1/3">
        <div className="flex items-center space-x-1">
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
      </div>
      <div className="basis-full md:basis-2/3">
        {softUsedMax > 0 && (
          <UsedDescription
            usedCards={usedCards.soft[cardid]}
            decks={decks}
            inventoryType="s"
          />
        )}
        {hardUsedTotal > 0 && (
          <UsedDescription
            usedCards={usedCards.hard[cardid]}
            decks={decks}
            inventoryType="h"
          />
        )}
      </div>
    </div>
  );
};

export default ResultLayoutTextInventory;
