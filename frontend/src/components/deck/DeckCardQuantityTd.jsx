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
          : "border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark print:dark:text-fgPrimary min-w-[28px] border-r sm:min-w-[35px]"
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
