import { DeckCardQuantity } from "@/components";

const DeckCardQuantityTd = ({
  card,
  cardChange,
  deckid,
  hardUsedTotal,
  inInventory,
  inMissing,
  inProxy,
  inventoryType,
  isEditable,
  isSelected,
  q,
  softUsedMax,
}) => {
  return (
    <td
      className={
        isEditable
          ? "min-w-[75px]"
          : "min-w-[32px] border-bgSecondary border-r bg-blue/5 sm:min-w-[40px] dark:border-bgSecondaryDark print:dark:text-fgPrimary"
      }
    >
      <DeckCardQuantity
        card={card}
        q={q}
        deckid={deckid}
        cardChange={cardChange}
        inInventory={inInventory}
        softUsedMax={softUsedMax}
        hardUsedTotal={hardUsedTotal}
        inventoryType={inventoryType}
        isEditable={isEditable}
        inMissing={inMissing}
        inProxy={inProxy}
        isSelected={isSelected}
      />
    </td>
  );
};

export default DeckCardQuantityTd;
