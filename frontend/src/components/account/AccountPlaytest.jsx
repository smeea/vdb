import React, { useState } from 'react';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import Wrench from 'assets/images/icons/wrench.svg';
import { AccountPlaytestManage, ButtonIconed } from 'components';
import { useApp } from 'context';

const AccountPlaytest = () => {
  const { playtest, isPlaytestAdmin, togglePlaytest } = useApp();
  const [showManage, setShowManage] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center"
          onClick={() => {
            togglePlaytest();
          }}
        >
          <div className={playtest ? 'pe-2' : 'pe-2 text-neutral-500-font'}>
            {playtest ? (
              <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
            ) : (
              <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
            )}
          </div>
          Playtest Mode
        </div>
        {isPlaytestAdmin && (
          <ButtonIconed
            variant="primary"
            onClick={() => setShowManage(true)}
            title="Manage Playtesters"
            icon={<Wrench />}
            text="Manage Playtesters"
          />
        )}
      </div>
      {showManage && <AccountPlaytestManage setShow={setShowManage} />}
    </>
  );
};

export default AccountPlaytest;
