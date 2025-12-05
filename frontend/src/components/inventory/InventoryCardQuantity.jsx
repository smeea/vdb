import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import { ValueSetter, ButtonCardChange } from "@/components";
import { ERROR, IS_FROZEN } from "@/constants";
import { inventoryCardChange, inventoryStore, useApp } from "@/context";

const InventoryCardQuantity = ({ card, softUsedMax, forceIsNonEditable, hardUsedTotal, compact, newFocus }) => {
  const { isMobile } = useApp();
  const [manual, setManual] = useState(compact);
  const [state, setState] = useState(card.q ?? "");
  const isEditable = forceIsNonEditable ? false : !useSnapshot(inventoryStore)[IS_FROZEN];
  const color = state < softUsedMax + hardUsedTotal ? ERROR : null

  const handleChange = (q) => inventoryCardChange(card.c, q);

  return (
    <ValueSetter color={color} newFocus={newFocus} handleChange={handleChange} isEditable={isEditable} isManual={compact} value={card.q} withNote={card.t} />
  );
};

export default InventoryCardQuantity;
