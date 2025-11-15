import { Checkbox } from "@/components";
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
  HAND_SIZE,
  INFERNAL,
  INTERCEPT_1,
  MANEUVER,
  NON_TWD,
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
} from "@/constants";
import { useApp } from "@/context";

const CryptSearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="flex basis-5/9 flex-col gap-0.5">
          {[
            [INTERCEPT_1, "+1 intercept"],
            [STEALTH_1, "+1 stealth"],
            [BLEED_1, "+1 bleed"],
            [BLEED_2, "+2 bleed"],
            [STRENGTH_1, "+1 strength"],
            [STRENGTH_2, "+2 strength"],
            [MANEUVER, "Maneuver"],
            [ADDITIONAL_STRIKE, "Additional Strike"],
            [AGGRAVATED, "Aggravated"],
            [PREVENT, "Prevent"],
            [PRESS, "Press"],
          ].map((i) => (
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
            [ENTER_COMBAT, "Enter combat"],
            [UNLOCK, "Unlock"],
            [BLACK_HAND, "Black Hand"],
            [SERAPH, "Seraph"],
            [INFERNAL, "Infernal"],
            [RED_LIST, "Red List"],
            [FLIGHT, "Flight"],
            [HAND_SIZE, "Hand Size"],
            [ADVANCEMENT, "Advancement"],
            [BANNED, "Banned"],
            [NON_TWD, "Not in TWD"],
            [PLAYTEST, "Playtest"],
          ]
            .filter((i) => ![PLAYTEST].includes(i[0]) || playtestMode)
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
