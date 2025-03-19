import { Checkbox, ResultPathImage } from '@/components';
import {
  ADDITIONAL_STRIKE,
  ADVANCEMENT,
  AGGRAVATED,
  BANNED,
  BLACK_HAND,
  BLEED_1,
  BLEED_2,
  CAINE,
  CATHARI,
  DEATH,
  ENTER_COMBAT,
  FLIGHT,
  HAND_SIZE,
  INFERNAL,
  INTERCEPT_1,
  MANEUVER,
  NON_TWD,
  PATH_CAINE,
  PATH_CATHARI,
  PATH_DEATH,
  PATH_POWER,
  PLAYTEST,
  POWER,
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
import { useApp } from '@/context';

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Traits:</div>
      <div className="flex">
        <div className="flex basis-5/9 flex-col gap-0.5">
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
            [
              PATH_CAINE,
              <div className="flex items-center gap-1.5">
                Path of Caine <ResultPathImage value={CAINE} size="sm" />
              </div>,
            ],
            [
              PATH_CATHARI,
              <div className="flex items-center gap-1.5">
                Path of Cathari <ResultPathImage value={CATHARI} size="sm" />
              </div>,
            ],
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
        <div className="flex basis-4/9 flex-col gap-0.5">
          {[
            [ENTER_COMBAT, 'Enter combat'],
            [UNLOCK, 'Unlock'],
            [BLACK_HAND, 'Black Hand'],
            [SERAPH, 'Seraph'],
            [INFERNAL, 'Infernal'],
            [RED_LIST, 'Red List'],
            [FLIGHT, 'Flight'],
            [HAND_SIZE, 'Hand Size'],
            [ADVANCEMENT, 'Advancement'],
            [BANNED, 'Banned'],
            [NON_TWD, 'Not in TWD'],
            [
              PATH_DEATH,
              <div className="flex items-center gap-1.5">
                Path of Death <ResultPathImage value={DEATH} size="sm" />
              </div>,
            ],
            [
              PATH_POWER,
              <div className="flex items-center gap-1.5">
                Path of Power <ResultPathImage value={POWER} size="sm" />
              </div>,
            ],
            [PLAYTEST, 'Playtest'],
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
