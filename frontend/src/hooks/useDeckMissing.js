import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

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
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const missingCrypt = useMemo(() => {
    if (isEmpty || !deck) return null;

    return getMissing(
      deck.crypt,
      deck.inventoryType,
      usedCrypt,
      inventoryCrypt
    );
  }, [deck.crypt, deck.inventoryType, isEmpty]);

  const missingLibrary = useMemo(() => {
    if (isEmpty || !deck) return null;

    return getMissing(
      deck.library,
      deck.inventoryType,
      usedLibrary,
      inventoryLibrary
    );
  }, [deck.library, deck.inventoryType, isEmpty]);

  return { missingCrypt, missingLibrary };
};

export default useDeckMissing;
