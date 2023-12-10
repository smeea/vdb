import { useSnapshot } from 'valtio';
import { usedStore, inventoryStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

const getMissing = (cards, inventoryType, used, inventory) => {
  const crypt = {};

  Object.keys(cards).map((card) => {
    const softUsedMax = getSoftMax(used.soft[card]);
    const hardUsedTotal = getHardTotal(used.hard[card]);

    let miss;
    if (!inventoryType && cards[card].q > softUsedMax) {
      miss = hardUsedTotal + cards[card].q - inventory[card]?.q;
    } else {
      miss = hardUsedTotal + softUsedMax - inventory[card]?.q;
    }

    if (miss > 0) {
      crypt[card] = { ...cards[card] };
      crypt[card].q = miss > cards[card].q ? cards[card].q : miss;
    }
  });

  return crypt;
};

const useDeckMissing = (deck) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  if (!deck) return { missingCrypt: null, missingLibrary: null };

  const missingCrypt = getMissing(
    deck.crypt,
    deck.inventoryType,
    usedCrypt,
    inventoryCrypt
  );
  const missingLibrary = getMissing(
    deck.library,
    deck.inventoryType,
    usedLibrary,
    inventoryLibrary
  );

  return { missingCrypt, missingLibrary };
};

export default useDeckMissing;
