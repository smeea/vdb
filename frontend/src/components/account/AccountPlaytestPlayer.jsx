import React, { useState } from 'react';
import { Toggle } from '@/components';
import { miscServices } from '@/services';

const AccountPlaytestPlayer = ({ username }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    miscServices.changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <Toggle isOn={state} toggle={handleClick}>
      {username}
    </Toggle>
  );
};

export default AccountPlaytestPlayer;
