import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import { Tooltip, UsedPopover } from "@/components";
import { CRYPT, ID, LIBRARY, LOGIC, SURPLUS_USED, VALUE, WISHLIST } from "@/constants";
import { inventoryStore, sharedStore, useApp, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

const ResultUsed = ({ card }) => {
  const { searchSharedMode, isDesktop } = useApp();
  const { [CRYPT]: inventoryCrypt, [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const { [CRYPT]: sharedCrypt, [LIBRARY]: sharedLibrary } = useSnapshot(sharedStore);
  const { [WISHLIST]: wishlist } = useSnapshot(inventoryStore);

  const used = card[ID] > 200000 ? usedCrypt : usedLibrary;
  const inventory = card[ID] > 200000 ? inventoryCrypt : inventoryLibrary;
  const shared = card[ID] > 200000 ? sharedCrypt : sharedLibrary;

  const softUsedMax = getSoftMax(used.soft[card[ID]]);
  const hardUsedTotal = getHardTotal(used.hard[card[ID]]);
  const inInventory = inventory[card[ID]]?.q || 0;
  const inShared = shared?.[card[ID]]?.q || 0;
  const isInventoryNote = inventory[card[ID]]?.t;
  const wishlistLogic = wishlist?.[card[ID]]?.[LOGIC];
  const surplus = wishlistLogic
    ? wishlistLogic === SURPLUS_USED
      ? inInventory - (softUsedMax + hardUsedTotal + (wishlist[card[ID]]?.[VALUE] || 0))
      : inInventory - (wishlist[card[ID]]?.[VALUE] || 0)
    : inInventory - (softUsedMax + hardUsedTotal);

  return (
    <Tooltip placement={isDesktop ? "left" : "bottom"} overlay={<UsedPopover cardid={card[ID]} />}>
      {((searchSharedMode && inShared > 0) ||
        inInventory > 0 ||
        softUsedMax + hardUsedTotal > 0) && (
        <div
          className={twMerge(
            "mx-1 flex items-center px-0.5",
            surplus < 0 && "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark",
          )}
        >
          <div className="flex basis-3/5 justify-center text-lg">
            {isInventoryNote && <div className="min-w-[4px]" />}
            {searchSharedMode ? inShared : inInventory}
            {isInventoryNote && <div className="max-w-[4px] text-sm">*</div>}
          </div>
          <div
            className={twMerge(
              "flex basis-2/5 justify-center text-sm",
              surplus >= 0 ? "text-midGray dark:text-midGrayDark" : "text-white dark:text-white",
            )}
          >
            {surplus > 0 ? `+${surplus}` : surplus}
          </div>
        </div>
      )}
    </Tooltip>
  );
};

export default ResultUsed;
