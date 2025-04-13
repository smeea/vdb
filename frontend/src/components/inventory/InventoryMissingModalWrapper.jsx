import { DeckMissingModal } from "@/components";
import { AUTHOR, CRYPT, DECKID, DESCRIPTION, ID, LIBRARY, NAME } from "@/constants";
import { inventoryStore, useApp } from "@/context";
import { useInventoryCrypt, useInventoryLibrary } from "@/hooks";
import { getIsPlaytest } from "@/utils";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

const InventoryMissingModalWrapper = ({
  clan,
  type,
  discipline,
  crypt,
  library,
  category,
  onlyNotes,
  setShow,
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
        .forEach((i) => (missing[i.c[ID]] = i));
      return missing;
    }
    return {};
  }, [type, discipline, missingByType, missingByDiscipline]);

  const missAllVtesCrypt = {};
  const missAllVtesLibrary = {};

  Object.keys(cryptCardBase)
    .filter((cardid) => {
      return !getIsPlaytest(cardid) && (!inventoryCrypt[cardid] || !inventoryCrypt[cardid]?.q);
    })
    .forEach((cardid) => (missAllVtesCrypt[cardid] = { q: 1, c: cryptCardBase[cardid] }));

  Object.keys(libraryCardBase)
    .filter((cardid) => {
      return !getIsPlaytest(cardid) && (!inventoryLibrary[cardid] || !inventoryLibrary[cardid]?.q);
    })
    .forEach((cardid) => (missAllVtesLibrary[cardid] = { q: 1, c: libraryCardBase[cardid] }));

  return (
    <DeckMissingModal
      deck={{
        [NAME]: "Missing cards for Inventory",
        [AUTHOR]: publicName,
        [DESCRIPTION]: "",
        [CRYPT]: missingCrypt,
        [LIBRARY]: missingLibrary,
        [DECKID]: "missingInInventory",
      }}
      missAllVtes={{ [CRYPT]: missAllVtesCrypt, [LIBRARY]: missAllVtesLibrary }}
      setShow={setShow}
      inInventory
    />
  );
};

export default InventoryMissingModalWrapper;
