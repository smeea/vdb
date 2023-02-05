import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryTableRowCommon,
  ConditionalTooltip,
  Checkbox,
  DeckProxyTableSetSelect,
} from '@/components';
import { useApp, usedStore, inventoryStore } from '@/context';
import { getSoftMax, getHardTotal } from '@/utils';

const DeckProxyLibraryTableRow = ({
  handleClick,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  inventoryType,
  card,
  idx,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  return (
    <tr
      key={card.c.Id}
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <td className="min-w-[25px]">
        <div className="flex items-center justify-center">
          <Checkbox
            id={card.c.Id}
            name="print"
            checked={proxySelected[card.c.Id]?.print}
            onChange={handleProxySelector}
          />
        </div>
      </td>
      <td className="min-w-[75px]">
        <ConditionalTooltip
          overlay={<UsedPopover cardid={card.c.Id} />}
          disabled={!inventoryMode}
        >
          <DeckCardQuantity
            card={card.c}
            deckid={null}
            q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
            inInventory={inInventory}
            inventoryType={inventoryType}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            cardChange={handleProxyCounter}
            isSelected={proxySelected[card.c.Id]?.print}
            inProxy
          />
        </ConditionalTooltip>
      </td>
      <ResultLibraryTableRowCommon
        card={card.c}
        handleClick={handleClick}
        inDeck
      />
      {!isMobile && (
        <DeckProxyTableSetSelect
          card={card.c}
          handleSetSelector={handleSetSelector}
          value={proxySelected[card.c.Id]?.set}
        />
      )}
    </tr>
  );
};

export default DeckProxyLibraryTableRow;
