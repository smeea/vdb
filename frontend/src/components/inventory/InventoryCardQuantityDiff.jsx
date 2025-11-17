import { ConditionalTooltip, UsedPopover } from "@/components";
import { ID } from "@/constants";
import { useApp } from "@/context";

const InventoryCardQuantityDiff = ({ card, surplus = null, softUsedMax, hardUsedTotal }) => {
  const { isMobile } = useApp();

  return (
    <ConditionalTooltip
      placement="bottom"
      overlay={<UsedPopover cardid={card.c[ID]} />}
      disabled={isMobile}
    >
      {surplus !== null ? (
        <div
          className={
            surplus === 0
              ? "text-midGray dark:text-midGrayDark"
              : surplus > 0
                ? "text-fgGreen dark:text-fgGreenDark"
                : "text-fgRed dark:text-fgRedDark"
          }
        >
          [{surplus > 0 ? `+${surplus}` : surplus}]
        </div>
      ) : (
        <div
          className={
            card.q === softUsedMax + hardUsedTotal
              ? "text-midGray dark:text-midGrayDark"
              : card.q >= softUsedMax + hardUsedTotal
                ? "text-fgGreen dark:text-fgGreenDark"
                : "text-fgRed dark:text-fgRedDark"
          }
        >
          {card.q === softUsedMax + hardUsedTotal
            ? "="
            : card.q > softUsedMax + hardUsedTotal
              ? `+${card.q - softUsedMax - hardUsedTotal}`
              : card.q - softUsedMax - hardUsedTotal}
        </div>
      )}
    </ConditionalTooltip>
  );
};

export default InventoryCardQuantityDiff;
