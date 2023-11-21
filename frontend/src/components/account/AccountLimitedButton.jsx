import React, { useState } from 'react';
import UiChecksGrid from '@/assets/images/icons/ui-checks-grid.svg?react';
import { AccountLimitedModal, ButtonIconed } from '@/components';

const AccountLimitedButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonIconed
        variant="primary"
        className="w-full"
        onClick={() => setShowModal(true)}
        title="Manage Format"
        icon={<UiChecksGrid />}
        text="Manage Limited Format"
      />
      {showModal && <AccountLimitedModal setShow={setShowModal} />}
    </>
  );
};

export default AccountLimitedButton;
