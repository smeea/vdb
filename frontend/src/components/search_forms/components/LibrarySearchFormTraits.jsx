import { Checkbox, ResultPathImage } from "@/components";
import {
  ADDITIONAL_STRIKE,
  AGGRAVATED,
  BANNED,
  BLACK_HAND,
  BLEED,
  BOUNCE_BLEED,
  BURN,
  CAINE,
  CATHARI,
  COMBAT_ENDS,
  DEATH,
  DODGE,
  EMBRACE,
  ENTER_COMBAT,
  INFERNAL,
  INTERCEPT,
  MANEUVER,
  MULTI_DISCIPLINE,
  MULTI_TYPE,
  NON_TWD,
  NO_REQUIREMENTS,
  PATH_CAINE,
  PATH_CATHARI,
  PATH_DEATH,
  PATH_POWER,
  PLAYTEST,
  POWER,
  PRESS,
  PREVENT,
  PUT_BLOOD,
  REDUCE_BLEED,
  SERAPH,
  STEALTH,
  STRENGTH,
  TRAITS,
  UNLOCK,
  VOTES_TITLE,
} from "@/constants";
import { useApp } from "@/context";

const LibrarySearchFormTraits = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Traits:</div>
      <div className="flex">
        <div className="flex basis-5/9 flex-col gap-0.5">
          {[
            [INTERCEPT, "+Intercept / -Stealth"],
            [STEALTH, "+Stealth / -Intercept"],
            [BLEED, "+Bleed"],
            [VOTES_TITLE, "+Votes / Title"],
            [STRENGTH, "+Strength"],
            [DODGE, "Dodge"],
            [MANEUVER, "Maneuver"],
            [ADDITIONAL_STRIKE, "Additional Strike"],
            [AGGRAVATED, "Aggravated"],
            [PREVENT, "Prevent"],
            [PRESS, "Press"],
            [COMBAT_ENDS, "Combat Ends"],
            [MULTI_TYPE, "Multi-Type"],
            [MULTI_DISCIPLINE, "Multi-Discipline"],
            [
              PATH_CAINE,
              <div key={CAINE} className="flex items-center gap-1.5">
                Path of Caine <ResultPathImage value={CAINE} size="sm" />
              </div>,
            ],
            [
              PATH_CATHARI,
              <div key={CATHARI} className="flex items-center gap-1.5">
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
            [ENTER_COMBAT, "Enter Combat"],
            [EMBRACE, "Create Vampire"],
            [PUT_BLOOD, "Blood to Uncontrolled"],
            [BOUNCE_BLEED, "Bounce Bleed"],
            [REDUCE_BLEED, "Reduce Bleed"],
            [UNLOCK, "Wake / Unlock"],
            [BLACK_HAND, "Black Hand"],
            [SERAPH, "Seraph"],
            [INFERNAL, "Infernal"],
            [BURN, "Burn Option"],
            [BANNED, "Banned"],
            [NON_TWD, "Not in TWD"],
            [NO_REQUIREMENTS, "No Requirement"],
            [
              PATH_DEATH,
              <div key={DEATH} className="flex items-center gap-1.5">
                Path of Death <ResultPathImage value={DEATH} size="sm" />
              </div>,
            ],
            [
              PATH_POWER,
              <div key={POWER} className="flex items-center gap-1.5">
                Path of Power <ResultPathImage value={POWER} size="sm" />
              </div>,
            ],
            [PLAYTEST, "Playtest"],
          ]
            .filter((i) => ![PLAYTEST, PATH_DEATH, PATH_POWER].includes(i[0]) || playtestMode)
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
