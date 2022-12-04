import React, { useState } from 'react';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { AccountDeleteConfirmation, ButtonIconed } from 'components';

const AccountDeleteButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <ButtonIconed
        className="w-100"
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
