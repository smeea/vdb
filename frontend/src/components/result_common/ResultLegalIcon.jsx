import React from 'react';
import HourglassSplit from '@/assets/images/icons/hourglass-split.svg?react';
import LightningChargeFill from '@/assets/images/icons/lightning-charge-fill.svg?react';
import Hammer from '@/assets/images/icons/hammer.svg?react';
import { PLAYTEST } from '@/utils/constants';

const ResultLegalIcon = ({ value, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center whitespace-nowrap text-fgRed dark:text-fgRedDark ${className}`}
      title={
        value === PLAYTEST ? 'Playtest' : `Not Tournament Legal until ${value}`
      }
    >
      {value === PLAYTEST ? (
        <LightningChargeFill
          className="inline"
          width="15"
          height="15"
          viewBox="0 0 16 16"
        />
      ) : value === 'BANNED' ? (
        <Hammer className="inline" width="15" height="15" viewBox="0 0 16 16" />
      ) : (
        <HourglassSplit
          className="inline"
          width="14"
          height="14"
          viewBox="0 0 16 16"
        />
      )}
    </div>
  );
};

export default ResultLegalIcon;
