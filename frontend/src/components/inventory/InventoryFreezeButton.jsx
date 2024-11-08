import React from 'react';
import LockFill from '@/assets/images/icons/lock-fill.svg?react';
import UnlockFill from '@/assets/images/icons/unlock-fill.svg?react';
import { Button } from '@/components';
import { useApp, inventoryUpdate } from '@/context';
import { IS_FROZEN } from '@/constants';

const InventoryFreezeButton = ({ isFrozen, className, roundedStyle, borderStyle }) => {
  const { isDesktop } = useApp();
  const handleClick = () => inventoryUpdate(IS_FROZEN, !isFrozen);

  return (
    <div className="flex items-center gap-2 text-fgPrimary dark:text-fgPrimaryDark">
      <Button
        variant={isDesktop ? 'secondary' : 'primary'}
        onClick={handleClick}
        title={`${isFrozen ? 'Disabled' : 'Enabled'} Editing`}
        className={className}
        roundedStyle={roundedStyle}
        borderStyle={borderStyle}
      >
        <>
          {isFrozen ? (
            <LockFill width="18" height="23" viewBox="0 0 16 16" />
          ) : (
            <UnlockFill width="18" height="23" viewBox="0 0 16 16" />
          )}
        </>
      </Button>
      {`Edit ${isFrozen ? 'disabled' : 'enabled'}`}
    </div>
  );
};

export default InventoryFreezeButton;
