import ArchiveFill from "@icons/archive-fill.svg?react";
import CalculatorFill from "@icons/calculator-fill.svg?react";
import PlusCircleFill from "@icons/plus-circle-fill.svg?react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  InventoryText,
  UsedDescription,
  WishlistSelectMethod,
  WishlistSetValue,
} from "@/components";
import {
  CRYPT,
  DECKS,
  HARD,
  ID,
  LIBRARY,
  LOGIC,
  SOFT,
  SURPLUS_USED,
  VALUE,
  WISHLIST,
} from "@/constants";
import { deckStore, inventoryStore, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

const ResultLayoutTextInventory = ({ card, inPopover, setIsHotkeysDisabled }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const {
    [WISHLIST]: wishlist,
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
  } = useSnapshot(inventoryStore);
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const usedCards = card[ID] > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards[SOFT][card[ID]]);
  const hardUsedTotal = getHardTotal(usedCards[HARD][card[ID]]);
  const inInventory =
    card[ID] > 200000 ? inventoryCrypt[card[ID]]?.q || 0 : inventoryLibrary[card[ID]]?.q || 0;
  const text = card[ID] > 200000 ? inventoryCrypt[card[ID]]?.t : inventoryLibrary[card[ID]]?.t;

  const wishlistLogic = wishlist[card[ID]]?.[LOGIC];
  const surplus =
    wishlistLogic === SURPLUS_USED
      ? inInventory - (softUsedMax + hardUsedTotal + (wishlist[card[ID]]?.[VALUE] || 0))
      : inInventory - (wishlist[card[ID]]?.[VALUE] || 0);

  return (
    <div className="flex flex-col gap-1.5">
      <div className={twMerge("flex gap-1.5", inPopover ? "flex-col" : "max-md:flex-col")}>
        <div className="flex basis-full flex-col gap-0.5 md:basis-1/3">
          <div className="flex items-center gap-1.5">
            <div className="flex min-w-[16px] justify-center opacity-40">
              <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <div className="flex min-w-[18px] justify-center font-bold">
              {softUsedMax + hardUsedTotal}
            </div>
            -<div>Total Used</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex min-w-[16px] justify-center opacity-40">
              <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <div className="flex min-w-[18px] justify-center font-bold">{inInventory}</div>-
            <div>In Inventory</div>
          </div>
          {wishlistLogic && (
            <div className="flex items-center gap-1.5">
              <div className="flex min-w-[16px] justify-center opacity-40">
                <PlusCircleFill width="14" height="14" viewBox="0 0 16 16" />
              </div>
              <div
                className={twMerge(
                  "flex min-w-[18px] justify-center font-bold",
                  surplus === 0
                    ? "text-midGray dark:text-midGrayDark"
                    : surplus > 0
                      ? "text-fgGreen dark:text-fgGreenDark"
                      : "text-fgRed dark:text-fgRedDark",
                )}
              >
                {surplus > 0 ? `+${surplus}` : surplus}
              </div>
              -<div>Surplus</div>
            </div>
          )}
        </div>
        {(softUsedMax > 0 || hardUsedTotal > 0) && (
          <div className="flex basis-full flex-col gap-0.5 md:basis-2/3">
            {softUsedMax > 0 && (
              <UsedDescription
                usedCards={usedCards[SOFT][card[ID]]}
                decks={decks}
                inventoryType="s"
              />
            )}
            {hardUsedTotal > 0 && (
              <UsedDescription
                usedCards={usedCards[HARD][card[ID]]}
                decks={decks}
                inventoryType="h"
              />
            )}
          </div>
        )}
      </div>
      {!inPopover && (
        <div className="flex items-center gap-2">
          <div className="whitespace-nowrap">Target:</div>
          <div className="w-full">
            <WishlistSelectMethod cardid={card[ID]} />
          </div>
          <div className="min-w-[84px]">
            <WishlistSetValue cardid={card[ID]} />
          </div>
        </div>
      )}
      {(!inPopover || text) && (
        <InventoryText
          setIsHotkeysDisabled={setIsHotkeysDisabled}
          text={text}
          card={card}
          inPopover={inPopover}
        />
      )}
    </div>
  );
};

export default ResultLayoutTextInventory;
