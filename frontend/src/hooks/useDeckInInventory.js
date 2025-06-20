import { useSnapshot } from "valtio";
import { CRYPT, LIBRARY } from "@/constants";
import { inventoryStore } from "@/context";

const useDeckInInventory = (deck) => {
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);

  let cryptInInventory;
  let libraryInInventory;

  Object.keys(deck[CRYPT]).forEach((cardid) => {
    if (deck[CRYPT][cardid].q > 0) {
      if (inventoryCrypt[cardid]) {
        const inInventory = Math.floor(inventoryCrypt[cardid].q / deck[CRYPT][cardid].q);
        if (cryptInInventory === undefined || inInventory < cryptInInventory) {
          cryptInInventory = inInventory;
        }
      } else {
        cryptInInventory = 0;
      }
    }
  });

  Object.keys(deck[LIBRARY]).forEach((cardid) => {
    if (deck[LIBRARY][cardid].q > 0) {
      if (inventoryLibrary[cardid] && deck[LIBRARY][cardid].q > 0) {
        const inInventory = Math.floor(inventoryLibrary[cardid].q / deck[LIBRARY][cardid].q);
        if (libraryInInventory === undefined || inInventory < libraryInInventory) {
          libraryInInventory = inInventory;
        }
      } else {
        libraryInInventory = 0;
      }
    }
  });

  if (cryptInInventory === undefined) cryptInInventory = libraryInInventory;
  if (libraryInInventory === undefined) libraryInInventory = cryptInInventory;

  return Math.min(cryptInInventory, libraryInInventory);
};

export default useDeckInInventory;
