import React from 'react';
import {
  UsedPopover,
  DeckCardQuantity,
  ConditionalTooltip,
} from '@/components';

const DeckCardQuantityTd = ({
  card,
  cardChange,
  deckid,
  disabledTooltip,
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
          : 'min-w-[40px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark'
      }
    >
      <ConditionalTooltip
        placement="bottom"
        overlay={<UsedPopover cardid={card.Id} />}
        disabled={disabledTooltip}
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
      </ConditionalTooltip>
    </td>
  );
};

export default DeckCardQuantityTd;
