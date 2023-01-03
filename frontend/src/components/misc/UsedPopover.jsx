import React from 'react';
import { useSnapshot } from 'valtio';
import ArchiveFill from 'assets/images/icons/archive-fill.svg';
import CalculatorFill from 'assets/images/icons/calculator-fill.svg';
import { UsedDescription } from 'components';
import { deckStore, usedStore, inventoryStore } from 'context';
import { getHardTotal, getSoftMax } from 'utils';

const UsedPopover = ({ cardid }) => {
  const decks = useSnapshot(deckStore).decks;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCards = cardid > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards.soft[cardid]);
  const hardUsedTotal = getHardTotal(usedCards.hard[cardid]);
  let inInventory =
    cardid > 200000 ? inventoryCrypt[cardid]?.q : inventoryLibrary[cardid]?.q;
  if (!inInventory) inInventory = 0;

  return (
    <div>
      {softUsedMax == 0 && hardUsedTotal == 0 ? (
        <div>Not used in inventory decks</div>
      ) : (
        <>
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
        </>
      )}
      <hr className="border-1 border-midGray dark:border-midGrayDark" />
      <div className="flex items-center">
        <div className="opacity-40">
          <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="font-bold">{softUsedMax + hardUsedTotal}</div>- Total
        Used
      </div>
      <div className="flex items-center">
        <div className="opacity-40">
          <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="font-bold">{inInventory}</div>- In Inventory
      </div>
    </div>
  );
};

export default UsedPopover;
