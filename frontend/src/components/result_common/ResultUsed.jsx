import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import { Tooltip, UsedPopover } from '@/components';
import { CRYPT, ID, LIBRARY } from '@/constants';
import { inventoryStore, useApp, usedStore } from '@/context';
import { getHardTotal, getSoftMax } from '@/utils';

const ResultUsed = ({ card }) => {
  const { isDesktop } = useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);

  const used = card[ID] > 200000 ? usedCrypt : usedLibrary;
  const inventory = card[ID] > 200000 ? inventoryCrypt : inventoryLibrary;

  const softUsedMax = getSoftMax(used.soft[card[ID]]);
  const hardUsedTotal = getHardTotal(used.hard[card[ID]]);
  const inInventory = inventory[card[ID]]?.q || 0;

  const isInventoryNote = inventory[card[ID]]?.t;

  return (
    <Tooltip placement={isDesktop ? 'left' : 'bottom'} overlay={<UsedPopover cardid={card[ID]} />}>
      {(inInventory > 0 || softUsedMax + hardUsedTotal > 0) && (
        <div
          className={twMerge(
            'mx-1 flex items-center px-0.5',
            inInventory < softUsedMax + hardUsedTotal &&
              'bg-bgError dark:bg-bgErrorDark dark:text-whiteDark text-white',
          )}
        >
          <div className="flex basis-3/5 justify-center text-lg">
            {isInventoryNote && <div className="min-w-[4px]" />}
            {inInventory}
            {isInventoryNote && <div className="max-w-[4px] text-sm">*</div>}
          </div>
          <div
            className={twMerge(
              'flex basis-2/5 justify-center text-sm',
              inInventory >= softUsedMax + hardUsedTotal
                ? 'text-midGray dark:text-midGrayDark'
                : 'text-white dark:text-white',
            )}
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
