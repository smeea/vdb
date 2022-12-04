import React from 'react';
import { useSnapshot } from 'valtio';
import ArchiveFill from 'assets/images/icons/archive-fill.svg';
import CalculatorFill from 'assets/images/icons/calculator-fill.svg';
import { UsedDescription } from 'components';
import { deckStore, usedStore, inventoryStore } from 'context';

const UsedPopover = ({ cardid }) => {
  const decks = useSnapshot(deckStore).decks;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  let softUsedMax = 0;
  let hardUsedTotal = 0;
  let SoftUsedDescription;
  let HardUsedDescription;
  let usedCards = null;

  let inInventory = 0;
  if (cardid > 200000) {
    if (inventoryCrypt[cardid]) {
      inInventory = inventoryCrypt[cardid].q;
    }
    usedCards = usedCrypt;
  } else {
    if (inventoryLibrary[cardid]) {
      inInventory = inventoryLibrary[cardid].q;
    }
    usedCards = usedLibrary;
  }

  if (usedCards && usedCards.soft[cardid]) {
    SoftUsedDescription = Object.keys(usedCards.soft[cardid]).map((id) => {
      if (softUsedMax < usedCards.soft[cardid][id]) {
        softUsedMax = usedCards.soft[cardid][id];
      }
      return (
        <UsedDescription
          key={id}
          q={usedCards.soft[cardid][id]}
          deck={decks[id]}
          t="s"
        />
      );
    });
  }

  if (usedCards && usedCards.hard[cardid]) {
    HardUsedDescription = Object.keys(usedCards.hard[cardid]).map((id) => {
      hardUsedTotal += usedCards.hard[cardid][id];
      return (
        <UsedDescription
          key={id}
          q={usedCards.hard[cardid][id]}
          deck={decks[id]}
          t="h"
        />
      );
    });
  }

  return (
    <div className="p-3">
      {softUsedMax == 0 && hardUsedTotal == 0 ? (
        <div className="py-1">Not used in inventory decks</div>
      ) : (
        <>
          {softUsedMax > 0 && <>{SoftUsedDescription}</>}
          {hardUsedTotal > 0 && <>{HardUsedDescription}</>}
        </>
      )}
      <hr />
      <div className="flex items-center">
        <div className="opacity-40">
          <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="px-1">
          <b>{softUsedMax + hardUsedTotal}</b>
        </div>
        - Total Used
      </div>
      <div className="flex items-center">
        <div className="opacity-40">
          <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="px-1">
          <b>{inInventory}</b>
        </div>
        - In Inventory
      </div>
    </div>
  );
};

export default UsedPopover;
