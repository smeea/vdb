import React from 'react';
import { useSnapshot } from 'valtio';
import { UsedPopover, Tooltip } from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import { useApp, inventoryStore, usedStore } from '@/context';

const ResultUsed = ({ card }) => {
  const { isDesktop } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;

  const used = card.Id > 200000 ? usedCrypt : usedLibrary;
  const inventory = card.Id > 200000 ? inventoryCrypt : inventoryLibrary;

  const softUsedMax = getSoftMax(used.soft[card.Id]);
  const hardUsedTotal = getHardTotal(used.hard[card.Id]);
  const inInventory = inventory[card.Id]?.q || 0;

  const isInventoryNote = inventory[card.Id]?.t

  return (
    <Tooltip
      placement={isDesktop ? 'left' : 'bottom'}
      overlay={<UsedPopover cardid={card.Id} />}
    >
      {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
        <div
          className={`mx-1 flex items-center gap-0.5 px-0.5 ${
            inInventory < softUsedMax + hardUsedTotal
              ? 'bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark'
              : ''
          }
                  `}
        >
          <div className="flex basis-full justify-center text-lg">
            {isInventoryNote && <div className="min-w-[4px]"></div>}
            {inInventory}
            {isInventoryNote && <div className="max-w-[4px] text-xs">*</div>}
          </div>
          <div
            className={`flex basis-full justify-center text-sm ${
              inInventory >= softUsedMax + hardUsedTotal
                ? 'text-midGray dark:text-midGrayDark'
                : 'text-lightGray dark:text-white'
            } `}
          >
            {inInventory >= softUsedMax + hardUsedTotal
              ? `+${inInventory - softUsedMax - hardUsedTotal}`
              : inInventory - softUsedMax - hardUsedTotal}
          </div>
        </div>
      )}
    </Tooltip>
  );
};

export default ResultUsed;
