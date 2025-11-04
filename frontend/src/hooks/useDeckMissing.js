import { CRYPT, INVENTORY_TYPE, LIBRARY } from "@/constants";
import { inventoryStore, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

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
  const missingCrypt = isEmpty || !deck
        ? null
    : getMissing(deck[CRYPT], deck[INVENTORY_TYPE], usedStore[CRYPT], inventoryStore[CRYPT])

  const missingLibrary = isEmpty || !deck
        ? null
    : getMissing(
      deck[LIBRARY],
      deck[INVENTORY_TYPE],
      usedStore[LIBRARY],
      inventoryStore[LIBRARY],
    );

  return { missingCrypt, missingLibrary };
};

export default useDeckMissing;
