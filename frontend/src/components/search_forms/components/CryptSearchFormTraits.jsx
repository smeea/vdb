import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="space-y-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="w-7/12 space-y-0.5">
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
          ].filter((i) => !['path-caine', 'path-cathari'].includes(i[0]) || playtestMode)
            .map((i, index) => (
              <Checkbox
                key={index}
                name="traits"
                value={i[0]}
                label={i[1]}
                checked={value[i[0]]}
                onChange={onChange}
              />
            ))}
        </div>
        <div className="w-5/12 space-y-0.5">
          {[
            ['enter combat', 'Enter combat'],
            ['unlock', 'Unlock'],
            ['black hand', 'Black Hand'],
            ['seraph', 'Seraph'],
            ['infernal', 'Infernal'],
            ['red list', 'Red List'],
            ['flight', 'Flight'],
            ['advancement', 'Advancement'],
            ['banned', 'Banned'],
            ['non-twd', 'Not in TWD'],
            ['playtest', 'Playtest'],
            ['path-death', 'Path of Death'],
            ['path-power', 'Path of Power'],
          ]
           .filter((i) => !['playtest', 'path-death', 'path-power'].includes(i[0]) || playtestMode)
            .map((i, index) => {
              return (
                <Checkbox
                  key={index}
                  name="traits"
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
