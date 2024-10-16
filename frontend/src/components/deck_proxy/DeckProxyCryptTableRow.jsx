import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  ResultCryptTableRowCommon,
  Checkbox,
  DeckProxyTableSetSelect,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useApp, usedStore, inventoryStore } from '@/context';
import { CRYPT } from '@/utils/constants';

const DeckProxyCryptTableRow = ({
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  disciplinesSet,
  keyDisciplines,
  inventoryType,
  card,
  handleClick,
}) => {
  const { isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

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
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
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

export default DeckProxyCryptTableRow;
