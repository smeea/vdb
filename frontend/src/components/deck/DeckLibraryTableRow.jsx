import { twMerge } from "tailwind-merge";
import {
  DeckCardQuantityTd,
  DeckCardToggleInventoryStateTd,
  DeckDrawProbability,
  ResultLibraryTableRowCommon,
} from "@/components";
import { NAME } from "@/constants";
import { deckCardChange, useApp } from "@/context";
import { useSwipe } from "@/hooks";
import { getSwipedBg } from "@/utils";

const DeckLibraryTableRow = ({
  handleClick,
  card,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
  inTwd,
  shouldShowModal,
  isEditable,
  deckid,
  inventoryType,
}) => {
  const { inventoryMode, isDesktop } = useApp();

  const { isSwiped, swipeHandlers } = useSwipe(
    () => deckCardChange(deckid, card.c, card.q - 1),
    () => deckCardChange(deckid, card.c, card.q + 1),
    isEditable,
  );

  return (
    <tr
      {...swipeHandlers}
      className={twMerge(
        "mx-2 h-[38px] border-bgSecondary border-y dark:border-bgSecondaryDark",
        getSwipedBg(isSwiped),
      )}
    >
      {inventoryMode && inventoryType && !inMissing && !inSearch && isDesktop && !inTwd && (
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
        inMissing={inMissing}
        inventoryType={inventoryType}
        isEditable={isEditable}
        q={card.q}
      />
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        inTwd={inTwd}
        inDeck
      />
      {showInfo && libraryTotal <= 100 && (
        <td className="min-w-[45px] text-right sm:p-1">
          <DeckDrawProbability cardName={card.c[NAME]} N={libraryTotal} n={7} k={card.q} />
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
