import React, { useState } from 'react';
import TrashFill from '@/assets/images/icons/trash-fill.svg?react';
import { AccountDeleteConfirmation, ButtonIconed } from '@/components';

const AccountDeleteButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      {showConfirmation && (
        <AccountDeleteConfirmation setShow={setShowConfirmation} />
      )}
    </>
  );
};

export default AccountDeleteButton;
