import { useSnapshot } from "valtio";
import { UsedPopover, ValueSetter } from "@/components";
import {
  CRYPT,
  ERROR,
  HARD,
  ID,
  LIBRARY,
  LOGIC,
  SOFT,
  SURPLUS_USED,
  VALUE,
  WARNING,
  WISHLIST,
} from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

const DeckCardQuantity = ({
  deckid,
  card,
  q,
  inventoryType,
  isSelected,
  cardChange,
  inProxy,
  isEditable,
  inMissing,
}) => {
  const { inventoryMode } = useApp();

  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const {
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
    [WISHLIST]: wishlist,
  } = useSnapshot(inventoryStore);
  const inInventory =
    (card[ID] > 200000 ? inventoryCrypt[card[ID]]?.q : inventoryLibrary[card[ID]]?.q) ?? 0;
  const softUsedMax =
    getSoftMax(card[ID] > 200000 ? usedCrypt[SOFT][card[ID]] : usedLibrary[SOFT][card[ID]]) ?? 0;
  const hardUsedTotal =
    getHardTotal(card[ID] > 200000 ? usedCrypt[HARD][card[ID]] : usedLibrary[HARD][card[ID]]) ?? 0;

  const wishlistLogic = wishlist?.[card[ID]]?.[LOGIC];
  const surplus =
    wishlistLogic === SURPLUS_USED
      ? inInventory - (softUsedMax + hardUsedTotal + (wishlist[card[ID]]?.[VALUE] || 0))
      : inInventory - (softUsedMax + hardUsedTotal);

  const inventoryColor =
    inventoryType && inProxy
      ? surplus + (isSelected ? q : 0) >= 0
        ? null
        : ERROR
      : surplus >= 0
        ? null
        : inInventory >= q
          ? WARNING
          : ERROR;

  const handleChange = (qty) => cardChange(deckid, card, qty);

  return (
    <ValueSetter
      color={inventoryMode && !inMissing && inventoryColor}
      overlay={inventoryMode && <UsedPopover cardid={card?.[ID]} />}
      handleChange={handleChange}
      isEditable={isEditable}
      value={q}
      inDeck
    />
  );
};

export default DeckCardQuantity;
