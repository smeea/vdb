import LockFill from '@icons/lock-fill.svg?react';
import UnlockFill from '@icons/unlock-fill.svg?react';
import { Button } from '@/components';
import { IS_FROZEN } from '@/constants';
import { inventoryUpdate, useApp } from '@/context';

const InventoryFreezeButton = ({ isFrozen, className, roundedStyle, borderStyle }) => {
  const { isDesktop } = useApp();
  const handleClick = () => inventoryUpdate(IS_FROZEN, !isFrozen);

  return (
    <div className="text-fgPrimary dark:text-fgPrimaryDark flex items-center gap-2">
      <Button
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={handleClick}
        title={`${isFrozen ? 'Disabled' : 'Enabled'} Editing`}
        className={className}
        roundedStyle={roundedStyle}
        borderStyle={borderStyle}
      >
        {isFrozen ? (
          <LockFill width="18" height="23" viewBox="0 0 16 16" />
        ) : (
          <UnlockFill width="18" height="23" viewBox="0 0 16 16" />
        )}
      </Button>
      {`Edit ${isFrozen ? 'disabled' : 'enabled'}`}
    </div>
  );
};

export default InventoryFreezeButton;
