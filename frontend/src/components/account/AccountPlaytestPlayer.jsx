import React, { useState } from 'react';
import { Toggle } from '@/components';

const AccountPlaytestPlayer = ({ changePlaytester, username }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <Toggle isOn={state} toggle={handleClick}>
      {username}
    </Toggle>
  );
};

export default AccountPlaytestPlayer;
