import React from 'react';
import { Checkbox } from '@/components';
import { useApp } from '@/context';
import {
  ADDITIONAL_STRIKE,
  ADVANCEMENT,
  AGGRAVATED,
  BANNED,
  BLACK_HAND,
  BLEED_1,
  BLEED_2,
  ENTER_COMBAT,
  FLIGHT,
  INFERNAL,
  INTERCEPT_1,
  MANEUVER,
  NON_TWD,
  PATH_CAINE,
  PATH_CATHARI,
  PATH_DEATH,
  PATH_POWER,
  PLAYTEST,
  PRESS,
  PREVENT,
  RED_LIST,
  SERAPH,
  STEALTH_1,
  STRENGTH_1,
  STRENGTH_2,
  TRAITS,
  UNLOCK,
} from '@/constants';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="flex w-7/12 flex-col gap-0.5">
          {[
            [INTERCEPT_1, '+1 intercept'],
            [STEALTH_1, '+1 stealth'],
            [BLEED_1, '+1 bleed'],
            [BLEED_2, '+2 bleed'],
            [STRENGTH_1, '+1 strength'],
            [STRENGTH_2, '+2 strength'],
            [MANEUVER, 'Maneuver'],
            [ADDITIONAL_STRIKE, 'Additional Strike'],
            [AGGRAVATED, 'Aggravated'],
            [PREVENT, 'Prevent'],
            [PRESS, 'Press'],
            [PATH_CAINE, 'Path of Caine'],
            [PATH_CATHARI, 'Path of Cathari'],
          ]
            .filter((i) => ![PATH_CAINE, PATH_CATHARI].includes(i[0]) || playtestMode)
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
            [ENTER_COMBAT, 'Enter combat'],
            [UNLOCK, 'Unlock'],
            [BLACK_HAND, 'Black Hand'],
            [SERAPH, 'Seraph'],
            [INFERNAL, 'Infernal'],
            [RED_LIST, 'Red List'],
            [FLIGHT, 'Flight'],
            [ADVANCEMENT, 'Advancement'],
            [BANNED, 'Banned'],
            [NON_TWD, 'Not in TWD'],
            [PLAYTEST, 'Playtest'],
            [PATH_DEATH, 'Path of Death'],
            [PATH_POWER, 'Path of Power'],
          ]
            .filter((i) => ![PLAYTEST, PATH_DEATH, PATH_POWER].includes(i[0]) || playtestMode)
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
