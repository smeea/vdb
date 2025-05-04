import {
  CardPopover,
  ConditionalTooltip,
  ResultLibraryTableRowReqClanDis,
  ResultLibraryTypeImage,
  ResultName,
  Tr,
  UsedPopover,
} from "@/components";
import { HARD, ID, LIBRARY, TYPE } from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal } from "@/utils";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

const TwdResultLibraryKeyCardsTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { inventoryMode, isMobile } = useApp();
  const { [LIBRARY]: inventoryLibrary } = useSnapshot(inventoryStore);
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const inInventory = inventoryLibrary[card.c[ID]]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedLibrary[HARD][card.c[ID]]);

  return (
    <Tr key={card.c[ID]}>
      <td className="min-w-[28px] border-bgSecondary border-r bg-blue/5 sm:min-w-[35px] dark:border-bgSecondaryDark">
        {inventoryMode ? (
          <ConditionalTooltip overlay={<UsedPopover cardid={card.c[ID]} />} disabled={isMobile}>
            <div
              className={twMerge(
                "mx-1 flex justify-center text-lg",
                inInventory < card.q
                  ? "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark"
                  : inInventory - hardUsedTotal < card.q && "bg-bgWarning dark:bg-bgWarningDark",
              )}
            >
              {card.q}
            </div>
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
