import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
  CardPopover,
  ConditionalTooltip,
  ResultClanImage,
  ResultCryptCapacity,
  ResultName,
  Tr,
  UsedPopover,
} from "@/components";
import { CLAN, CRYPT, HARD, ID, LOGIC, SURPLUS_USED, VALUE, WISHLIST } from "@/constants";
import { inventoryStore, useApp, usedStore } from "@/context";
import { getHardTotal } from "@/utils";

const TwdResultCryptTableRow = ({ card, handleClick, shouldShowModal }) => {
  const { inventoryMode, isMobile } = useApp();
  const { [CRYPT]: inventoryCrypt, [WISHLIST]: wishlist } = useSnapshot(inventoryStore);
  const { [CRYPT]: usedCrypt } = useSnapshot(usedStore);
  const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt[HARD][card.c[ID]]);

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
      <td className="min-w-[30px] sm:min-w-[40px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultCryptCapacity card={card.c} />
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
      <td className="min-w-[30px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultClanImage value={card.c[CLAN]} />
        </div>
      </td>
    </Tr>
  );
};

export default TwdResultCryptTableRow;
