import React from 'react';
import PeopleFill from '@/assets/images/icons/people-fill.svg';

const TwdResultDescriptionPlayers = ({ players }) => {
  return (
    <div
      className={`m-1 flex  items-center justify-center space-x-1 rounded-md border-dashed text-lg text-fgSecondary dark:text-fgSecondaryDark ${
        players >= 30
          ? 'border-[3px] border-fgSecondary font-bold dark:border-fgSecondaryDark'
          : 'border-2 border-borderPrimary dark:border-borderPrimaryDark'
      }`}
    >
      <PeopleFill />
      <div>{players}</div>
    </div>
  );
};

export default TwdResultDescriptionPlayers;
