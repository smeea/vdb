import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  ResultLibraryTableRowCommon,
  Checkbox,
  DeckProxyTableSetSelect,
} from '@/components';
import { useApp, usedStore, inventoryStore } from '@/context';
import { getSoftMax, getHardTotal } from '@/utils';
import { SOFT, HARD, LIBRARY } from '@/utils/constants';

const DeckProxyLibraryTableRow = ({
  handleClick,
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  inventoryType,
  card,
}) => {
  const { isMobile } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore)[LIBRARY];
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedLibrary[SOFT][card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c.Id]) ?? 0;

  return (
    <tr key={card.c.Id} className="row-bg border-y border-bgSecondary dark:border-bgSecondaryDark">
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
      <DeckCardQuantityTd
        card={card.c}
        cardChange={handleProxyCounter}
        deckid={null}
        hardUsedTotal={hardUsedTotal}
        inInventory={inInventory}
        inProxy
        inventoryType={inventoryType}
        isEditable
        isSelected={proxySelected[card.c.Id]?.print}
        q={proxySelected[card.c.Id] ? proxySelected[card.c.Id].q : 0}
        softUsedMax={softUsedMax}
      />
      <ResultLibraryTableRowCommon card={card.c} handleClick={handleClick} inDeck />
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
