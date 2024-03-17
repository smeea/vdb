import React, { useState } from 'react';
import { Flag, Toggle } from '@/components';
import { playtestServices } from '@/services';

const AccountPlaytestPlayer = ({ username, lang }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    playtestServices.changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <div className="flex justify-between">
      <Toggle isOn={state} toggle={handleClick}>
        <div className="flex items-center gap-2">
          {username}
          {lang && <Flag value={lang} />}
        </div>
      </Toggle>
    </div>
  );
};

export default AccountPlaytestPlayer;
