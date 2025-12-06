import { twMerge } from "tailwind-merge";
import {
  DeckCardQuantityTd,
  DeckCardToggleInventoryStateTd,
  DeckDrawProbability,
  ResultCryptTableRowCommon,
} from "@/components";
import { NAME } from "@/constants";
import { deckCardChange, useApp } from "@/context";
import { useSwipe } from "@/hooks";
import { getSwipedBg } from "@/utils";

const DeckCryptTableRow = ({
  handleClick,
  card,
  disciplinesSet,
  keyDisciplines,
  showInfo,
  cryptTotal,
  inSearch,
  inMissing,
  noDisciplines,
  shouldShowModal,
  inSide,
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
        "h-[38px] border-bgSecondary border-y dark:border-bgSecondaryDark",
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
        disabledTooltip={!inventoryMode}
        inMissing={inMissing}
        inventoryType={inventoryType}
        isEditable={isEditable}
        q={card.q}
      />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        inSearch={inSearch}
        shouldShowModal={shouldShowModal}
        noDisciplines={noDisciplines}
        inDeck
      />
      {showInfo && cryptTotal <= 35 && (
        <td className="min-w-[45px] text-right sm:p-1">
          {!inSide && (
            <DeckDrawProbability cardName={card.c[NAME]} N={cryptTotal} n={4} k={card.q} />
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckCryptTableRow;
