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
      <div
        className={
          playtest
            ? 'd-flex white-font-toggle'
            : 'd-flex gray-font-toggle'
        }
      >
        {playtest ? (
          <ToggleOn viewBox="0 0 16 16" />
        ) : (
          <ToggleOff viewBox="0 0 16 16" />
        )}
      </div>
      <div
        className={
          playtest
            ? 'd-inline ps-2 white-font'
            : 'd-inline ps-2 gray-font'
        }
      >
        Playtest Mode
      </div>
    </div>

  );
};

export default AccountPlaytest;
