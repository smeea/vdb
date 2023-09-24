import React, { useState } from 'react';
import UiChecksGrid from '@/assets/images/icons/ui-checks-grid.svg?react';
import { AccountLimitedModal, ButtonIconed, Toggle } from '@/components';
import { useApp } from '@/context';

const AccountLimitedButtons = () => {
  const { limitedSwitch, toggleLimitedSwitch } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <Toggle isOn={limitedSwitch} toggle={toggleLimitedSwitch}>
          Limited Format
        </Toggle>
        <ButtonIconed
          variant="primary"
          onClick={() => setShowModal(true)}
          title="Manage Format"
          icon={<UiChecksGrid />}
          text="Manage Format"
        />
      </div>
      {showModal && <AccountLimitedModal setShow={setShowModal} />}
    </>
  );
};

export default AccountLimitedButtons;
