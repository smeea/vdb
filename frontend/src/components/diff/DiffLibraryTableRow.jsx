import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  DeckCardQuantityTd,
  DeckDrawProbability,
  DiffQuantityDiffCard,
  ResultLibraryTableRowCommon,
} from "@/components";
import { DECKS, ID, INVENTORY_TYPE, NAME } from "@/constants";
import { deckCardChange, deckStore, useApp } from "@/context";
import { useSwipe } from "@/hooks";
import { getSwipedBg } from "@/utils";

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
        inventoryType={decks?.[deckid]?.[INVENTORY_TYPE]}
        isEditable={isEditable}
        q={qFrom}
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
