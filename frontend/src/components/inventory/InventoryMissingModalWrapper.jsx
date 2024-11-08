import React, { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { DeckMissingModal } from '@/components';
import { useApp, inventoryStore } from '@/context';
import { useInventoryCrypt, useInventoryLibrary } from '@/hooks';
import { ID, CRYPT, LIBRARY } from '@/constants';

const InventoryMissingModalWrapper = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
  handleClose,
}) => {
  const { cryptCardBase, libraryCardBase, publicName } = useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { missingByClan } = useInventoryCrypt(crypt, category, false, onlyNotes);
  const { missingByType, missingByDiscipline } = useInventoryLibrary(
    library,
    category,
    false,
    type,
    discipline,
    onlyNotes,
  );

  const missingCrypt = useMemo(() => {
    if (missingByClan) return missingByClan[clan];
    return {};
  }, [clan, missingByClan]);

  const missingLibrary = useMemo(() => {
    if (missingByDiscipline && missingByType) {
      const missing = {};
      Object.values(missingByType[type])
        .filter((i) => {
          return missingByDiscipline[discipline][i.c[ID]];
        })
        .map((i) => (missing[i.c[ID]] = i));
      return missing;
    }
    return {};
  }, [type, discipline, missingByType, missingByDiscipline]);

  const missAllVtesCrypt = {};
  const missAllVtesLibrary = {};

  Object.keys(cryptCardBase)
    .filter((cardid) => {
      return cardid < 210000 && (!inventoryCrypt[cardid] || !inventoryCrypt[cardid]?.q);
    })
    .map((cardid) => (missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] }));

  Object.keys(libraryCardBase)
    .filter((cardid) => {
      return cardid < 110000 && (!inventoryLibrary[cardid] || !inventoryLibrary[cardid]?.q);
    })
    .map((cardid) => (missAllVtesLibrary[cardid] = { q: 1, c: libraryCardBase[cardid] }));

  return (
    <DeckMissingModal
      deck={{
        name: 'Missing cards for Inventory',
        author: publicName,
        description: '',
        crypt: missingCrypt,
        library: missingLibrary,
        deckid: 'missingInInventory',
      }}
      missAllVtes={{ crypt: missAllVtesCrypt, library: missAllVtesLibrary }}
      handleClose={handleClose}
      inInventory
    />
  );
};

export default InventoryMissingModalWrapper;
