import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';
import {
  BURN,
  PLAYTEST,
  NO_REQUIREMENTS,
  MULTI_DISCIPLINE,
  MULTI_TYPE,
  BANNED,
  NON_TWD,
  TRAITS,
} from '@/constants';

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
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
            [MULTI_TYPE, 'Multi-Type'],
            [MULTI_DISCIPLINE, 'Multi-Discipline'],
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
            [BURN, 'Burn Option'],
            [BANNED, 'Banned'],
            [NON_TWD, 'Not in TWD'],
            [NO_REQUIREMENTS, 'No Requirement'],
            ['playtest', 'Playtest'],
            ['path-death', 'Path of Death'],
            ['path-power', 'Path of Power'],
          ]
            .filter((i) => !['playtest', 'path-death', 'path-power'].includes(i[0]) || playtestMode)
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
      </div>
    </div>
  );
};

export default LibrarySearchFormTraits;
