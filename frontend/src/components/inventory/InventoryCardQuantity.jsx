import { useSnapshot } from "valtio";
import { UsedPopover, ValueSetter } from "@/components";
import { ERROR, ID, IS_FROZEN } from "@/constants";
import { inventoryCardChange, inventoryStore } from "@/context";

const InventoryCardQuantity = ({
  card,
  forceIsNonEditable,
  noOverlay,
  noColor,
  surplus,
  compact,
  newFocus,
}) => {
  const isFrozen = useSnapshot(inventoryStore)[IS_FROZEN];
  const isEditable = forceIsNonEditable ? false : !isFrozen;
  const color = noColor || surplus >= 0 ? null : ERROR;

  const handleChange = (q) => inventoryCardChange(card.c, q);

  return (
    <div className="w-full">
      <ValueSetter
        overlay={!noOverlay && <UsedPopover cardid={card.c[ID]} />}
        color={color}
        newFocus={newFocus}
        handleChange={handleChange}
        isEditable={isEditable}
        isManual={compact}
        value={card.q}
        withNote={card.t}
      />
    </div>
  );
};

export default InventoryCardQuantity;
