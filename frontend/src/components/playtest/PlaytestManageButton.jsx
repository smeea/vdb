import React, { useState } from 'react';
import Wrench from '@/assets/images/icons/wrench.svg?react';
import { PlaytestManageModal, ButtonIconed } from '@/components';

const PlaytestManageButton = () => {
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
      {showModal && <PlaytestManageModal setShow={setShowModal} />}
    </>
  );
};

export default PlaytestManageButton;
