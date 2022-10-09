import React, { useState } from 'react';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { AccountDeleteConfirmation, ButtonIconed } from 'components';

const AccountDeleteButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <ButtonIconed
        variant="danger"
        onClick={() => setShowConfirmation(true)}
        title="Delete account"
        icon={<TrashFill />}
        text="Delete account"
      />
      <AccountDeleteConfirmation
        show={showConfirmation}
        setShow={setShowConfirmation}
      />
    </>
  );
};

export default AccountDeleteButton;
