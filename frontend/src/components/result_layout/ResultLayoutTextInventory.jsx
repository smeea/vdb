import CalculatorFill from "@icons/calculator-fill.svg?react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  Hr,
  InventoryCardQuantity,
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
  SURPLUS_FIXED,
  SURPLUS_USED,
  VALUE,
  WISHLIST,
} from "@/constants";
import { deckStore, inventoryStore, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

const ResultLayoutTextInventory = ({ card, setIsHotkeysDisabled }) => {
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
  const inventoryCard =
    card[ID] > 200000
      ? (inventoryCrypt[card[ID]] ?? { c: card, q: 0 })
      : (inventoryLibrary[card[ID]] ?? { c: card, q: 0 });
  const inInventory = inventoryCard?.q || 0;
  const text = inventoryCard?.t;

  const wishlistLogic = wishlist?.[card[ID]]?.[LOGIC];
  const surplus =
    wishlistLogic === SURPLUS_USED
      ? inInventory - (softUsedMax + hardUsedTotal + (wishlist[card[ID]]?.[VALUE] || 0))
      : wishlistLogic === SURPLUS_FIXED
        ? inInventory - (wishlist[card[ID]]?.[VALUE] || 0)
        : inInventory - (softUsedMax + hardUsedTotal);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="min-w-[84px]">
            <InventoryCardQuantity card={inventoryCard} />
          </div>
          <div>In Inventory</div>
          <div
            className={twMerge(
              "flex min-w-[18px] gap-0.5 pb-0.5 text-lg",
              surplus === 0
                ? "text-midGray dark:text-midGrayDark"
                : surplus > 0
                  ? "text-fgGreen dark:text-fgGreenDark"
                  : "text-fgRed dark:text-fgRedDark",
            )}
          >
            [<div title="Missing / Surplus">{surplus > 0 ? `+${surplus}` : surplus}</div>]
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="min-w-[84px]">
            <WishlistSetValue cardid={card[ID]} />
          </div>
          <div className="whitespace-nowrap">Target</div>
          <div className="w-full">
            <WishlistSelectMethod cardid={card[ID]} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex min-w-[84px] items-center text-lg">
            <div className="flex min-w-[18px] justify-center opacity-40">
              <CalculatorFill />
            </div>
            <div className="mx-1 flex min-w-[40px] justify-center">
              {softUsedMax + hardUsedTotal}
            </div>
            <div className="flex min-w-[18px] justify-center">-</div>
          </div>
          <div>Total Used</div>
        </div>
      </div>
      {(softUsedMax > 0 || hardUsedTotal > 0) && (
        <>
          <div className="w-2/3">
            <Hr />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1.5">
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
          </div>
        </>
      )}
      <InventoryText setIsHotkeysDisabled={setIsHotkeysDisabled} text={text} card={card} />
    </div>
  );
};

export default ResultLayoutTextInventory;
