import React, { useState } from 'react';
import Wrench from '@/assets/images/icons/wrench.svg?react';
import { AccountPlaytestModal, ButtonIconed } from '@/components';

const AccountPlaytestButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ButtonIconed
        className="w-full"
        variant="primary"
        onClick={() => setShowModal(true)}
        title="Manage Playtesters"
        icon={<Wrench />}
        text="Manage Playtesters"
      />
      {showModal && <AccountPlaytestModal setShow={setShowModal} />}
    </>
  );
};

export default AccountPlaytestButton;
