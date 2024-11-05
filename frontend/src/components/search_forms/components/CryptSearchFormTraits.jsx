import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';
import { ADVANCEMENT, BANNED, NON_TWD, TRAITS } from '@/constants';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="flex w-7/12 flex-col gap-0.5">
          {[
            ['1 intercept', '+1 intercept'],
            ['1 stealth', '+1 stealth'],
            ['1 bleed', '+1 bleed'],
            ['2 bleed', '+2 bleed'],
            ['1 strength', '+1 strength'],
            ['2 strength', '+2 strength'],
            ['maneuver', 'Maneuver'],
            ['additional strike', 'Additional Strike'],
            ['aggravated', 'Aggravated'],
            ['prevent', 'Prevent'],
            ['press', 'Press'],
            ['path-caine', 'Path of Caine'],
            ['path-cathari', 'Path of Cathari'],
          ]
            .filter((i) => !['path-caine', 'path-cathari'].includes(i[0]) || playtestMode)
            .map((i) => (
              <Checkbox
                key={i[0]}
                name={TRAITS}
                value={i[0]}
                label={i[1]}
                checked={value[i[0]]}
                onChange={onChange}
              />
            ))}
        </div>
        <div className="flex w-5/12 flex-col gap-0.5">
          {[
            ['enter combat', 'Enter combat'],
            ['unlock', 'Unlock'],
            ['black hand', 'Black Hand'],
            ['seraph', 'Seraph'],
            ['infernal', 'Infernal'],
            ['red list', 'Red List'],
            ['flight', 'Flight'],
            [ADVANCEMENT, 'Advancement'],
            [BANNED, 'Banned'],
            [NON_TWD, 'Not in TWD'],
            ['playtest', 'Playtest'],
            ['path-death', 'Path of Death'],
            ['path-power', 'Path of Power'],
          ]
            .filter((i) => !['playtest', 'path-death', 'path-power'].includes(i[0]) || playtestMode)
            .map((i) => {
              return (
                <Checkbox
                  key={i[0]}
                  name={TRAITS}
                  value={i[0]}
                  label={i[1]}
                  checked={value[i[0]]}
                  onChange={onChange}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CryptSearchFormTraits;
