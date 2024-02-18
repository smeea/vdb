import { useSnapshot } from 'valtio';
import { inventoryStore } from '@/context';

const useDeckInInventory = (deck) => {
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  let cryptInInventory;
  let libraryInInventory;

  Object.keys(deck.crypt).forEach((cardid) => {
    if (deck.crypt[cardid].q > 0) {
      if (inventoryCrypt[cardid]) {
        const inInventory = Math.floor(
          inventoryCrypt[cardid].q / deck.crypt[cardid].q,
        );
        if (cryptInInventory === undefined || inInventory < cryptInInventory) {
          cryptInInventory = inInventory;
        }
      } else {
        cryptInInventory = 0;
      }
    }
  });

  Object.keys(deck.library).forEach((cardid) => {
    if (deck.library[cardid].q > 0) {
      if (inventoryLibrary[cardid] && deck.library[cardid].q > 0) {
        const inInventory = Math.floor(
          inventoryLibrary[cardid].q / deck.library[cardid].q,
        );
        if (
          libraryInInventory === undefined ||
          inInventory < libraryInInventory
        ) {
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
