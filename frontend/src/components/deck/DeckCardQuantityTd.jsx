import React from 'react';
import { DeckCardQuantity } from '@/components';

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
          ? 'min-w-[75px]'
          : 'min-w-[32px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[40px]'
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
