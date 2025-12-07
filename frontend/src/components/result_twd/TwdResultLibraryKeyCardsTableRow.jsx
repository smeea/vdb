import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  CardPopover,
  ConditionalTooltip,
  ResultLibraryTableRowReqClanDis,
  ResultLibraryTypeImage,
  ResultName,
  Tr,
  UsedPopover,
} from "@/components";
import { HARD, ID, LIBRARY, LOGIC, SURPLUS_USED, TYPE, VALUE, WISHLIST } from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal } from "@/utils";

const TwdResultLibraryKeyCardsTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { inventoryMode, isMobile } = useApp();
  const { [LIBRARY]: inventoryLibrary, [WISHLIST]: wishlist } = useSnapshot(inventoryStore);
  const { [LIBRARY]: usedLibrary } = useSnapshot(usedStore);
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);

  const wishlistLogic = wishlist?.[card.c[ID]]?.[LOGIC];
  const surplus =
    wishlistLogic === SURPLUS_USED
      ? inInventory - (hardUsedTotal + (wishlist[card.c[ID]]?.[VALUE] || 0))
      : inInventory - hardUsedTotal;

  const colorStyle =
    surplus < card.q
      ? inInventory < card.q
        ? "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark"
        : "bg-bgWarning dark:bg-bgWarningDark"
      : null;

  return (
    <Tr key={card.c[ID]}>
      <td className="min-w-[28px] border-bgSecondary border-r bg-blue/5 sm:min-w-[35px] dark:border-bgSecondaryDark">
        {inventoryMode ? (
          <ConditionalTooltip overlay={<UsedPopover cardid={card.c[ID]} />} disabled={isMobile}>
            <div className={twMerge("mx-1 flex justify-center text-lg", colorStyle)}>{card.q}</div>
          </ConditionalTooltip>
        ) : (
          <div className="flex justify-center text-lg">{card.q}</div>
        )}
      </td>
      <td className="min-w-[55px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultLibraryTypeImage value={card.c[TYPE]} />
        </div>
      </td>
      <td className="w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile || shouldShowModal}
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} />
          </div>
        </ConditionalTooltip>
      </td>
      <ResultLibraryTableRowReqClanDis
        className="max-sm:hidden"
        card={card.c}
        handleClick={() => handleClick(card.c)}
      />
    </Tr>
  );
};

export default TwdResultLibraryKeyCardsTableRow;
