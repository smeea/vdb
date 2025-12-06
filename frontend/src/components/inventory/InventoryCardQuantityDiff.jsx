import { ConditionalTooltip, UsedPopover } from "@/components";
import { ID } from "@/constants";
import { useApp } from "@/context";

const InventoryCardQuantityDiff = ({ card, surplus, isWishlist }) => {
  const { isMobile } = useApp();

  const colorStyle =
    surplus > 0
      ? "text-fgGreen dark:text-fgGreenDark"
      : surplus < 0
        ? "text-fgRed dark:text-fgRedDark"
        : "text-midGray dark:text-midGrayDark";

  return (
    <ConditionalTooltip
      placement="bottom"
      overlay={<UsedPopover cardid={card.c[ID]} />}
      disabled={isMobile}
    >
      <div className={colorStyle}>
        {isWishlist ? "[" : ""}
        {surplus === 0 ? "=" : surplus > 0 ? `+${surplus}` : surplus}
        {isWishlist ? "]" : ""}
      </div>
    </ConditionalTooltip>
  );
};

export default InventoryCardQuantityDiff;
