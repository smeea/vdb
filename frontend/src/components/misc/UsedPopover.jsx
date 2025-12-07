import ArchiveFill from "@icons/archive-fill.svg?react";
import Bullseye from "@icons/bullseye.svg?react";
import CalculatorFill from "@icons/calculator-fill.svg?react";
import ChatLeftQuoteFill from "@icons/chat-left-quote-fill.svg?react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import { Hr, UsedDescription } from "@/components";
import {
  CRYPT,
  DECKS,
  HARD,
  LIBRARY,
  LOGIC,
  SOFT,
  SURPLUS_USED,
  VALUE,
  WISHLIST,
} from "@/constants";
import { deckStore, inventoryStore, usedStore } from "@/context";
import { getHardTotal, getSoftMax } from "@/utils";

const UsedPopover = ({ cardid }) => {
  const decks = useSnapshot(deckStore)[DECKS];
  const { [CRYPT]: usedCrypt, [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const {
    [WISHLIST]: wishlist,
    [CRYPT]: inventoryCrypt,
    [LIBRARY]: inventoryLibrary,
  } = useSnapshot(inventoryStore);

  const usedCards = cardid > 200000 ? usedCrypt : usedLibrary;
  const softUsedMax = getSoftMax(usedCards[SOFT][cardid]);
  const hardUsedTotal = getHardTotal(usedCards[HARD][cardid]);
  let inInventory = cardid > 200000 ? inventoryCrypt[cardid]?.q : inventoryLibrary[cardid]?.q;
  const text = cardid > 200000 ? inventoryCrypt[cardid]?.t : inventoryLibrary[cardid]?.t;
  if (!inInventory) inInventory = 0;

  const wishlistLogic = wishlist?.[cardid]?.[LOGIC];
  const surplus =
    wishlistLogic === SURPLUS_USED
      ? inInventory - (softUsedMax + hardUsedTotal + (wishlist[cardid]?.[VALUE] || 0))
      : inInventory - (wishlist[cardid]?.[VALUE] || 0);

  const colorStyle =
    surplus > 0
      ? "text-fgGreen dark:text-fgGreenDark"
      : surplus < 0
        ? "text-fgRed dark:text-fgRedDark"
        : "text-midGray dark:text-midGrayDark";

  return (
    <div className="flex max-w-[250px] flex-col gap-1">
      {(softUsedMax !== 0 || hardUsedTotal !== 0) && (
        <>
          {softUsedMax > 0 && (
            <UsedDescription usedCards={usedCards[SOFT][cardid]} decks={decks} inventoryType="s" />
          )}
          {hardUsedTotal > 0 && (
            <UsedDescription usedCards={usedCards[HARD][cardid]} decks={decks} inventoryType="h" />
          )}
          <Hr />
        </>
      )}
      <div className="flex items-center gap-1.5">
        <div className="flex min-w-[16px] justify-center opacity-40">
          <CalculatorFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="flex min-w-[18px] justify-center font-bold">
          {softUsedMax + hardUsedTotal}
        </div>
        <div>- Total Used</div>
      </div>
      {!!wishlist[cardid]?.[VALUE] && wishlist[cardid]?.[LOGIC] && (
        <div className="flex items-center gap-1.5">
          <div className="flex min-w-[16px] justify-center opacity-40">
            <Bullseye width="14" height="14" viewBox="0 0 16 16" />
          </div>
          <div className="flex min-w-[18px] justify-center font-bold">
            {wishlist[cardid]?.[VALUE] || 0}
          </div>
          <div>- Target ({wishlist[cardid]?.[LOGIC] === SURPLUS_USED ? "Over Used" : "Fixed"})</div>
        </div>
      )}
      <div className="flex items-center gap-1.5">
        <div className="flex min-w-[16px] justify-center opacity-40">
          <ArchiveFill width="14" height="14" viewBox="0 0 16 16" />
        </div>
        <div className="flex min-w-[18px] justify-center font-bold">{inInventory}</div>
        <div>- In Inventory</div>
        <div className={twMerge("flex min-w-[18px] justify-center gap-0.5", colorStyle)}>
          [<div>{surplus === 0 ? "=" : surplus > 0 ? `+${surplus}` : surplus}</div>]
        </div>
      </div>
      {text && (
        <>
          <Hr />
          <div className="items-top flex gap-1.5">
            <div className="pt-1 opacity-40">
              <ChatLeftQuoteFill width="14" height="14" viewBox="0 0 16 16" />
            </div>
            <div className="text-sm">{text}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsedPopover;
