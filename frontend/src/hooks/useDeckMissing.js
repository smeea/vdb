const useDeckMissing = (
  deck,
  usedCryptCards,
  usedLibraryCards,
  inventoryCrypt,
  inventoryLibrary
) => {
  const getMissingCrypt = (d) => {
    const crypt = {};

    Object.keys(d.crypt).map((card) => {
      let softUsedMax = 0;
      if (usedCryptCards.soft[card]) {
        Object.keys(usedCryptCards.soft[card]).map((id) => {
          if (softUsedMax < usedCryptCards.soft[card][id]) {
            softUsedMax = usedCryptCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedCryptCards.hard[card]) {
        Object.keys(usedCryptCards.hard[card]).map((id) => {
          hardUsedTotal += usedCryptCards.hard[card][id];
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
      if (usedLibraryCards.soft[card]) {
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });
      }
      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[card]) {
        Object.keys(usedLibraryCards.hard[card]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card][id];
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
