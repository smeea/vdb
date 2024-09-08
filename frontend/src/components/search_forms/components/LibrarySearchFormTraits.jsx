import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="space-y-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="flex basis-5/9 flex-col gap-0.5">
          {[
            ['intercept', '+Intercept / -Stealth'],
            ['stealth', '+Stealth / -Intercept'],
            ['bleed', '+Bleed'],
            ['votes-title', '+Votes / Title'],
            ['strength', '+Strength'],
            ['dodge', 'Dodge'],
            ['maneuver', 'Maneuver'],
            ['additional strike', 'Additional Strike'],
            ['aggravated', 'Aggravated'],
            ['prevent', 'Prevent'],
            ['press', 'Press'],
            ['combat ends', 'Combat Ends'],
            ['multi-type', 'Multi-Type'],
            ['multi-discipline', 'Multi-Discipline'],
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
        <div className="flex basis-4/9 flex-col gap-0.5">
          {[
            ['enter combat', 'Enter Combat'],
            ['embrace', 'Create Vampire'],
            ['bloat', 'Blood to Uncontrolled'],
            ['bounce bleed', 'Bounce Bleed'],
            ['reduce bleed', 'Reduce Bleed'],
            ['unlock', 'Wake / Unlock'],
            ['black hand', 'Black Hand'],
            ['seraph', 'Seraph'],
            ['infernal', 'Infernal'],
            ['burn', 'Burn Option'],
            ['banned', 'Banned'],
            ['non-twd', 'Not in TWD'],
            ['no-requirements', 'No Requirement'],
            ['playtest', 'Playtest'],
            ['path-death', 'Path of Death'],
            ['path-power', 'Path of Power'],
          ]
            .filter((i) => !['playtest', 'path-death', 'path-power'].includes(i[0]) || playtestMode)
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
      </div>
    </div>
  );
};

export default LibrarySearchFormTraits;
