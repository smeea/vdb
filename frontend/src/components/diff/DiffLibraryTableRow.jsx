import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultLibraryTableRowCommon,
} from "@/components";
import { DECKS, HARD, ID, INVENTORY_TYPE, LIBRARY, NAME, SOFT } from "@/constants";
import { deckCardChange, deckStore, inventoryStore, useApp, usedStore } from "@/context";
import { useSwipe } from "@/hooks";
import { getHardTotal, getSoftMax, getSwipedBg } from "@/utils";

const DiffLibraryTableRow = ({
  cardChange,
  deckid,
  cardsFrom,
  cardsTo,
  isEditable,
  showInfo,
  libraryTotal,
  card,
  handleClick,
}) => {
  const { inventoryMode } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c[ID]]);
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const qFrom = cardsFrom[card.c[ID]]?.q ?? 0;
  const qTo = cardsTo[card.c[ID]]?.q ?? 0;

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        "h-[38px] border-bgSecondary border-y dark:border-bgSecondaryDark",
        getSwipedBg(isSwiped),
      )}
    >
      <DeckCardQuantityTd
        card={card.c}
        cardChange={cardChange ?? deckCardChange}
        deckid={cardChange ? null : deckid}
        disabledTooltip={!inventoryMode}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inventoryType={decks?.[deckid]?.[INVENTORY_TYPE]}
        isEditable={isEditable}
        q={qFrom}
        softUsedMax={softUsedMax}
      />
      <DiffQuantityDiffCard qFrom={qFrom} qTo={qTo} />
      <ResultLibraryTableRowCommon card={card.c} handleClick={handleClick} inDeck />
      {showInfo && (
        <td className="min-w-[40px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c[NAME]} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DiffLibraryTableRow;
