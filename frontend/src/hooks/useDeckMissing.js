import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';
import { INVENTORY_TYPE, CRYPT, LIBRARY } from '@/utils/constants';

const getMissing = (cards, inventoryType, used, inventory) => {
  const missingCards = {};

  Object.keys(cards).forEach((cardid) => {
    const softUsedMax = getSoftMax(used.soft[cardid]);
    const hardUsedTotal = getHardTotal(used.hard[cardid]);
    const inInventory = inventory?.[cardid]?.q ?? 0;
    const q = cards[cardid].q;

    const miss =
      !inventoryType && q > softUsedMax
        ? hardUsedTotal + q - inInventory
        : hardUsedTotal + softUsedMax - inInventory;

    if (miss > 0) {
      missingCards[cardid] = { ...cards[cardid] };
      missingCards[cardid].q = miss > q ? q : miss;
    }
  });

  return missingCards;
};

const useDeckMissing = (deck, isEmpty) => {
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);

  const missingCrypt = useMemo(() => {
    if (isEmpty || !deck) return null;

    return getMissing(deck.crypt, deck[INVENTORY_TYPE], usedCrypt, inventoryCrypt);
  }, [deck.crypt, deck[INVENTORY_TYPE], isEmpty]);

  const missingLibrary = useMemo(() => {
    if (isEmpty || !deck) return null;

    return getMissing(deck.library, deck[INVENTORY_TYPE], usedLibrary, inventoryLibrary);
  }, [deck.library, deck[INVENTORY_TYPE], isEmpty]);

  return { missingCrypt, missingLibrary };
};

export default useDeckMissing;
