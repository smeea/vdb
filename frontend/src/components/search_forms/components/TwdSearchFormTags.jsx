import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';
import {
  ACCEL,
  ALLY,
  BLEED,
  BLOCK,
  COMBAT,
  MMPA,
  RUSH,
  STEALTH,
  SWARM,
  VOTE,
  TAGS,
} from '@/constants';

const TwdSearchFormTags = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Tags:</div>
      <div className="flex">
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [ACCEL, 'Acceleration'],
            [ALLY, 'Ally'],
            [BLEED, 'Bleed'],
            [BLOCK, 'Block'],
          ].map((i) => (
            <Checkbox
              key={i[0]}
              name={TAGS}
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [COMBAT, 'Combat'],
            [MMPA, 'MMPA'],
            [RUSH, 'Rush'],
          ].map((i) => (
            <Checkbox
              key={i[0]}
              name={TAGS}
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [STEALTH, 'Stealth'],
            [SWARM, 'Swarm'],
            [VOTE, 'Vote'],
          ].map((i) => (
            <Checkbox
              key={i[0]}
              name={TAGS}
              value={i[0]}
              label={i[1]}
              checked={value[i[0]]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwdSearchFormTags;
