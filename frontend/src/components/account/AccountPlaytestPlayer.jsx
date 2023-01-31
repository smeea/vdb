import React, { useState } from 'react';
import { Toggle } from '@/components';

const AccountPlaytestPlayer = ({ changePlaytester, username }) => {
  const [state, setState] = useState(true);

  const handleClick = (value) => {
    changePlaytester(username, value);
    setState(!value);
  };

  return (
    <Toggle isOn={state} toggle={handleClick}>
      {username}
    </Toggle>
  );
};

export default AccountPlaytestPlayer;
