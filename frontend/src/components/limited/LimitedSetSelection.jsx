import { useSnapshot } from "valtio";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { LimitedSet } from "@/components";
import { DATE, PLAYTEST, POD, PROMO, TWO_P, SETS } from "@/constants";
import { limitedFullStore, limitedSetChange } from "@/context";

const LimitedSetSelection = () => {
  const BCP_START = "2018-01-01";
  const limitedSets = useSnapshot(limitedFullStore)[SETS];

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold text-fgSecondary text-lg underline dark:text-fgSecondaryDark">
        Sets:
      </div>
      <div className="flex gap-2 max-sm:flex-col">
        <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
          {Object.keys(setsAndPrecons)
            .filter((i) => ![PLAYTEST, PROMO, POD, TWO_P].includes(i) && setsAndPrecons[i][DATE] > BCP_START)
            .map((i) => {
              return (
                <LimitedSet
                  key={i}
                  isChecked={limitedSets[i]}
                  handleSetChange={limitedSetChange}
                  setid={i}
                />
              );
            })}
        </div>
        <div className="flex basis-full flex-col gap-2 sm:basis-1/2">
          {Object.keys(setsAndPrecons)
            .filter(
              (i) => ![PLAYTEST, PROMO, POD, TWO_P].includes(i) && setsAndPrecons[i][DATE] < BCP_START,
            )
            .map((i) => {
              return (
                <LimitedSet
                  key={i}
                  isChecked={limitedSets[i]}
                  handleSetChange={limitedSetChange}
                  setid={i}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LimitedSetSelection;
