import { useSnapshot } from "valtio";
import { ValueSetter } from "@/components";
import { ERROR, IS_FROZEN } from "@/constants";
import { inventoryCardChange, inventoryStore } from "@/context";

const InventoryCardQuantity = ({
  card,
  forceIsNonEditable,
  surplus,
  compact,
  newFocus,
}) => {
  const isFrozen = useSnapshot(inventoryStore)[IS_FROZEN];
  const isEditable = forceIsNonEditable ? false : !isFrozen;
  const color = surplus < 0 ? ERROR : null;

  const handleChange = (q) => inventoryCardChange(card.c, q);

  return (
    <ValueSetter
      color={color}
      newFocus={newFocus}
      handleChange={handleChange}
      isEditable={isEditable}
      isManual={compact}
      value={card.q}
      withNote={card.t}
    />
  );
};

export default InventoryCardQuantity;
