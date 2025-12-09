import LockFill from "@icons/lock-fill.svg?react";
import UnlockFill from "@icons/unlock-fill.svg?react";
import { ButtonIconed } from "@/components";
import { IS_FROZEN } from "@/constants";
import { inventoryUpdate, useApp } from "@/context";

const InventoryFreezeButton = ({ isFrozen, className, roundedStyle, borderStyle }) => {
  const { isDesktop } = useApp();
  const handleClick = () => inventoryUpdate(IS_FROZEN, !isFrozen);

  return (
      <ButtonIconed
        variant={isDesktop ? "secondary" : "primary"}
        onClick={handleClick}
        title={`${isFrozen ? "Disabled" : "Enabled"} Editing`}
        className={className}
        roundedStyle={roundedStyle}
        borderStyle={borderStyle}
        icon={
          isFrozen ? (
            <LockFill width="18" height="23" viewBox="0 0 16 16" />
          ) : (
            <UnlockFill width="18" height="23" viewBox="0 0 16 16" />
          )
        }
        text={`Edit ${isFrozen ? "disabled" : "enabled"}`}
      />
  );
};

export default InventoryFreezeButton;
