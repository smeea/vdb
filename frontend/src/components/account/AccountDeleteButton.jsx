import { useState } from 'react';
import TrashFill from '@icons/trash-fill.svg?react';
import { AccountDeleteConfirmation, ButtonIconed } from '@/components';

const AccountDeleteButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => setShowConfirmation(false);

  return (
    <>
      <ButtonIconed
        className="w-full"
        variant="danger"
        onClick={() => setShowConfirmation(true)}
        title="Delete account"
        icon={<TrashFill />}
        text="Delete account"
      />
      {showConfirmation && <AccountDeleteConfirmation handleClose={handleClose} />}
    </>
  );
};

export default AccountDeleteButton;
