import React from 'react';
import HourglassSplit from '@/assets/images/icons/hourglass-split.svg?react';
import LightningChargeFill from '@/assets/images/icons/lightning-charge-fill.svg?react';

const ResultLegalIcon = ({ value }) => {
  return (
    <div
      className="inline whitespace-nowrap text-fgRed dark:text-fgRedDark"
      title={
        value === 'PLAYTEST'
          ? 'Playtest'
          : `Not Tournament Legal until ${value}`
      }
    >
      {value === 'PLAYTEST' ? (
        <LightningChargeFill className="inline" />
      ) : (
        <HourglassSplit className="inline pb-[1px]" />
      )}
    </div>
  );
};

export default ResultLegalIcon;
