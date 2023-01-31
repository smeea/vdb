import React, { useState } from 'react';
import Wrench from '@/assets/images/icons/wrench.svg';
import { AccountPlaytestModal, ButtonIconed, Toggle } from '@/components';
import { useApp } from '@/context';

const AccountPlaytestButtons = () => {
  const { playtest, isPlaytestAdmin, togglePlaytest } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <Toggle isOn={playtest} toggle={togglePlaytest}>
          Playtest Mode
        </Toggle>
        {isPlaytestAdmin && (
          <ButtonIconed
            variant="primary"
            onClick={() => setShowModal(true)}
            title="Manage Playtesters"
            icon={<Wrench />}
            text="Manage Playtesters"
          />
        )}
      </div>
      {showModal && <AccountPlaytestModal size="sm" setShow={setShowModal} />}
    </>
  );
};

export default AccountPlaytestButtons;
