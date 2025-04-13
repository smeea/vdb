import {
  DeckCardQuantityTd,
  DeckCardToggleInventoryStateTd,
  DeckDrawProbability,
  ResultLibraryTableRowCommon,
} from "@/components";
import { HARD, ID, LIBRARY, NAME, SOFT } from "@/constants";
import { deckCardChange, inventoryStore, useApp, usedStore } from "@/context";
import { useSwipe } from "@/hooks";
import { getHardTotal, getSoftMax, getSwipedBg } from "@/utils";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

const DeckLibraryTableRow = ({
  handleClick,
  card,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
  shouldShowModal,
  isEditable,
  deckid,
  inventoryType,
}) => {
  const { inventoryMode, isDesktop } = useApp();
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]) ?? 0;

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        "mx-2 h-[38px] border-bgSecondary border-y dark:border-bgSecondaryDark",
        getSwipedBg(isSwiped),
      )}
    >
      {inventoryMode && inventoryType && !inMissing && !inSearch && isDesktop && (
        <DeckCardToggleInventoryStateTd
          isEditable={isEditable}
          card={card}
          deckid={deckid}
          inventoryType={inventoryType}
        />
      )}
      <DeckCardQuantityTd
        card={card.c}
        cardChange={deckCardChange}
        deckid={deckid}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inMissing={inMissing}
        inventoryType={inventoryType}
        isEditable={isEditable}
        q={card.q}
        softUsedMax={softUsedMax}
      />
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        inDeck
      />
      {showInfo && (
        <td className="min-w-[45px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c[NAME]} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
