import React from 'react';
import { useApp } from 'context';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';

const AccountPlaytest = (props) => {
  const { playtest, togglePlaytest } = useApp();

  return (
    <div
      className="d-flex align-items-center"
      onClick={() => {
        togglePlaytest();
      }}
    >
      <div className={playtest ? 'd-flex' : 'd-flex gray-font'}>
        {playtest ? (
          <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
        ) : (
          <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
        )}
      </div>
      <div className="d-inline ps-2">Playtest Mode</div>
    </div>
  );
};

export default AccountPlaytest;
