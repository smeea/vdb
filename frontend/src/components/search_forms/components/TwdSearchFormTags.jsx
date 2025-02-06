import React from 'react';
import { Button, Checkbox } from '@/components';
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

const TagCheckbox = ({ i, value, onChange }) => {
  const handleCheckbox = (e) => {
    const target = e.currentTarget.value;
    onChange(TAGS, target, value[target] ? false : true);
  };

  const handleNegative = (e) => {
    const target = e.currentTarget.value;
    onChange(TAGS, target, value[target] === null ? false : null);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        className="h-[16px] w-[12px] text-sm"
        onClick={handleNegative}
        value={i[0]}
        title={`Toggle NOT ${i[1]}`}
        noPadding
      >
        {value[i[0]] === null ? '!' : ' '}
      </Button>
      <Checkbox
        name={TAGS}
        value={i[0]}
        label={i[1]}
        checked={value[i[0]]}
        onChange={handleCheckbox}
      />
    </div>
  );
};

const TwdSearchFormTags = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Tags:</div>
      <div className="flex gap-4">
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [ACCEL, 'Acceleration'],
            [ALLY, 'Ally'],
            [BLEED, 'Bleed'],
            [BLOCK, 'Block'],
          ].map((i) => (
            <TagCheckbox key={i[0]} i={i} value={value} onChange={onChange} />
          ))}
        </div>
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [COMBAT, 'Combat'],
            [MMPA, 'MMPA'],
            [RUSH, 'Rush'],
          ].map((i) => (
            <TagCheckbox key={i[0]} i={i} value={value} onChange={onChange} />
          ))}
        </div>
        <div className="flex basis-1/3 flex-col gap-0.5">
          {[
            [STEALTH, 'Stealth'],
            [SWARM, 'Swarm'],
            [VOTE, 'Vote'],
          ].map((i) => (
            <TagCheckbox key={i[0]} i={i} value={value} onChange={onChange} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwdSearchFormTags;
