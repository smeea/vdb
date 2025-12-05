import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ValueSetter, ButtonCardChange, ConditionalTooltip, UsedPopover } from "@/components";
import { ERROR, WARNING, ID } from "@/constants";
import { useApp } from "@/context";

const DeckCardQuantity = ({
  deckid,
  card,
  q,
  inventoryType,
  inInventory,
  softUsedMax,
  hardUsedTotal,
  isSelected,
  cardChange,
  inProxy,
  isEditable,
  inMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();

  const getInventoryColor = () => {
    if (inventoryMode && !inMissing) {
      if (inventoryType) {
        if (inProxy) {
          return inInventory + (isSelected ? q : 0) < softUsedMax + hardUsedTotal
            ? ERROR
            : null
        }
        return inInventory >= softUsedMax + hardUsedTotal
          ? null
          : inInventory < q
          ? ERROR
          : WARNING
      }
      return inInventory - softUsedMax - hardUsedTotal >= q
        ? null
        : inInventory < q
        ? ERROR
        : WARNING
    }
    return null
  };
  const inventoryColor = getInventoryColor();

  const handleChange = (qty) => cardChange(deckid, card, qty)

  return (
    <ValueSetter
      color={inventoryColor}
      overlay={<UsedPopover cardid={card?.[ID]} />}
      handleChange={handleChange} isEditable={isEditable}
      value={q}
      inDeck/>
  );
};

export default DeckCardQuantity;
