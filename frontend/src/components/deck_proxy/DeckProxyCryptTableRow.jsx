import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  ResultCryptTableRowCommon,
  ConditionalTooltip,
  Checkbox,
  DeckProxyTableSetSelect,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useApp, usedStore, inventoryStore } from '@/context';

const DeckProxyCryptTableRow = ({
  proxySelected,
  handleProxySelector,
  handleProxyCounter,
  handleSetSelector,
  placement,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  maxDisciplines,
  inventoryType,
  card,
  idx,
  handleClick,
}) => {
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
  const softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]) ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]) ?? 0;

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
      <td className='min-w-[75px]'>
        <ConditionalTooltip
          placement="right"
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
      <ResultCryptTableRowCommon
        card={card.c}
        handleClick={handleClick}
        placement={placement}
        maxDisciplines={maxDisciplines}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
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
