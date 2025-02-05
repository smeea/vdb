import React from 'react';
import { useSnapshot } from 'valtio';
import {
  DeckCardQuantityTd,
  ResultCryptTableRowCommon,
  Checkbox,
  DeckProxyTableSetSelect,
  Tr,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useApp, usedStore, inventoryStore } from '@/context';
import { ID, PRINT, SET, SOFT, HARD, CRYPT } from '@/constants';

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
  const { isMobile, isWide } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c[ID]]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]) ?? 0;

  return (
    <Tr key={card.c[ID]}>
      <td className="min-w-[30px]">
        <div className="flex items-center justify-center">
          <Checkbox
            value={card.c[ID]}
            name={PRINT}
            checked={proxySelected[card.c[ID]]?.[PRINT]}
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
        isSelected={proxySelected[card.c[ID]]?.[PRINT]}
        q={proxySelected[card.c[ID]] ? proxySelected[card.c[ID]].q : 0}
        softUsedMax={softUsedMax}
      />
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        keyDisciplines={keyDisciplines}
        disciplinesSet={disciplinesSet}
        noDisciplines={!isWide}
        inDeck
      />
      {!isMobile && (
        <DeckProxyTableSetSelect
          card={card.c}
          handleSetSelector={handleSetSelector}
          value={proxySelected[card.c[ID]]?.[SET]}
        />
      )}
    </Tr>
  );
};

export default DeckProxyCryptTableRow;
