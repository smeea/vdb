import { useSnapshot } from 'valtio';
import { usedStore, inventoryStore } from 'context';

const useDeckMissing = (deck) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const getMissingCrypt = (d) => {
    const crypt = {};

    Object.keys(d.crypt).map((card) => {
      let softUsedMax = 0;
      if (usedCrypt.soft[card]) {
        Object.keys(usedCrypt.soft[card]).map((id) => {
          if (softUsedMax < usedCrypt.soft[card][id]) {
            softUsedMax = usedCrypt.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedCrypt.hard[card]) {
        Object.keys(usedCrypt.hard[card]).map((id) => {
          hardUsedTotal += usedCrypt.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!d.inventoryType && d.crypt[card].q > softUsedMax)
        miss += d.crypt[card].q - softUsedMax;
      if (inventoryCrypt[card]) miss -= inventoryCrypt[card].q;

      if (miss > 0) {
        crypt[card] = { ...d.crypt[card] };
        crypt[card].q = miss > d.crypt[card].q ? d.crypt[card].q : miss;
      }
    });

    return crypt;
  };

  const getMissingLibrary = (d) => {
    const library = {};

    Object.keys(d.library).map((card) => {
      let softUsedMax = 0;
      if (usedLibrary.soft[card]) {
        Object.keys(usedLibrary.soft[card]).map((id) => {
          if (softUsedMax < usedLibrary.soft[card][id]) {
            softUsedMax = usedLibrary.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibrary.hard[card]) {
        Object.keys(usedLibrary.hard[card]).map((id) => {
          hardUsedTotal += usedLibrary.hard[card][id];
        });
      }

      let miss = softUsedMax + hardUsedTotal;
      if (!d.inventoryType && d.library[card].q > softUsedMax)
        miss += d.library[card].q - softUsedMax;
      if (inventoryLibrary[card]) miss -= inventoryLibrary[card].q;

      if (miss > 0) {
        library[card] = { ...d.library[card] };
        library[card].q = miss > d.library[card].q ? d.library[card].q : miss;
      }
    });

    return library;
  };

  const missingCrypt = deck ? getMissingCrypt(deck) : null;
  const missingLibrary = deck ? getMissingLibrary(deck) : null;

  return { missingCrypt, missingLibrary };
};

export default useDeckMissing;
