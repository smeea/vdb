import { DeckCardQuantity } from "@/components";

const DeckCardQuantityTd = ({
  card,
  cardChange,
  deckid,
  inMissing,
  inProxy,
  inventoryType,
  isEditable,
  isSelected,
  q,
}) => {
  return (
    <td
      className={
        isEditable
          ? "min-w-[75px]"
          : "min-w-[28px] border-bgSecondary border-r bg-blue/5 sm:min-w-[35px] dark:border-bgSecondaryDark print:dark:text-fgPrimary"
      }
    >
      <DeckCardQuantity
        card={card}
        q={q}
        deckid={deckid}
        cardChange={cardChange}
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
