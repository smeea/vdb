import { useSnapshot } from "valtio";
import { ValueSetter } from "@/components";
import { ERROR, IS_FROZEN } from "@/constants";
import { inventoryCardChange, inventoryStore } from "@/context";

const InventoryCardQuantity = ({
  card,
  softUsedMax,
  forceIsNonEditable,
  hardUsedTotal,
  compact,
  newFocus,
}) => {
  const isFrozen = useSnapshot(inventoryStore)[IS_FROZEN];
  const isEditable = forceIsNonEditable ? false : !isFrozen;
  const color = card.q < softUsedMax + hardUsedTotal ? ERROR : null;

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
