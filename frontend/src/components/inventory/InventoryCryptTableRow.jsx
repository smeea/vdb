import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  CardPopover,
  ConditionalTooltip,
  InventoryCardQuantity,
  InventoryCardQuantityDiff,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptClanGroupTitle,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultName,
} from "@/components";
import { CLAN, CRYPT, DISCIPLINES, GROUP, HARD, ID, IS_FROZEN, SOFT, TITLE } from "@/constants";
import { inventoryCardChange, inventoryStore, useApp, usedStore } from "@/context";
import { useSwipe } from "@/hooks";
import { getHardTotal, getSoftMax, getSwipedBg } from "@/utils";

const InventoryCryptTableRow = ({
  card,
  compact,
  newFocus,
  forceNonEditable,
  shouldShowModal,
  handleClick,
}) => {
  const { isMobile, isWide } = useApp();
  const usedCrypt = useSnapshot(usedStore)[CRYPT];
  const softUsedMax = getSoftMax(usedCrypt[SOFT][card.c[ID]]);
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]);
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN] && !forceNonEditable;
  const onClick = () => handleClick(card.c);

  const { isSwiped, swipeHandlers } = useSwipe(
    () => inventoryCardChange(card.c, card.q - 1),
    () => inventoryCardChange(card.c, card.q + 1),
  );

  return (
    <div
      {...swipeHandlers}
      className={twMerge("flex w-full items-center", getSwipedBg(isSwiped, true))}
    >
      <div
        className={twMerge(
          "flex items-center justify-center",
          isEditable
            ? "min-w-[84px]"
            : "h-full min-w-[42px] border-bgSecondary border-r bg-blue/5 sm:min-w-[48px] dark:border-bgSecondaryDark",
        )}
      >
        {forceNonEditable ? (
          card.q || null
        ) : (
          <InventoryCardQuantity
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        )}
      </div>
      {!forceNonEditable && (
        <div className="flex min-w-[40px] justify-center">
          <InventoryCardQuantityDiff
            card={card}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
          />
        </div>
      )}
      <div className="flex min-w-[32px] justify-center sm:min-w-[40px]" onClick={onClick}>
        <ResultCryptCapacity card={card.c} />
      </div>
      <div className="flex min-w-[180px] max-lg:hidden" onClick={onClick}>
        <ResultCryptDisciplines value={card.c[DISCIPLINES]} />
      </div>
      <div className="flex w-full" onClick={onClick}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile || shouldShowModal}
          className="flex w-full"
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} />
          </div>
        </ConditionalTooltip>
      </div>
      {isWide ? (
        <>
          <div className="flex min-w-[25px] justify-center" onClick={onClick}>
            {card.c[TITLE] && <ResultCryptTitle value={card.c[TITLE]} />}
          </div>
          <div className="flex min-w-[35px] justify-center" onClick={onClick}>
            <ResultClanImage value={card.c[CLAN]} />
          </div>
          <div className="flex min-w-[30px] justify-center" onClick={onClick}>
            <ResultCryptGroup value={card.c[GROUP]} />
          </div>
        </>
      ) : (
        <div className="min-w-[40px]" onClick={onClick}>
          <ResultCryptClanGroupTitle card={card.c} />
        </div>
      )}
    </div>
  );
};

export default InventoryCryptTableRow;
