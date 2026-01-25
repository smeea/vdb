import { Link } from "react-router";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { CardImage, ConditionalTooltipOrModal } from "@/components";
import { DATE, NAME, PLAYTEST, POD, PRECONS, PROMO, SET, TWO_P } from "@/constants";
import { useApp } from "@/context";

const PreconsDetailed = ({ sets, set }) => {
  return Object.keys(sets[set]).map((i) => {
    if (i === "DTC") return null;
    const abbrevs = {
      U: "Uncommon",
      R: "Rare",
      C: "Common",
      V: "Vampire",
    };

    if (setsAndPrecons[set][PRECONS]?.[i]) {
      return (
        <li key={`${set}-${i}`} className="whitespace-nowrap">
          <Link target="_blank" rel="noreferrer" to={`/decks/${set}:${i}`}>
            {setsAndPrecons[set][PRECONS][i][NAME]}
          </Link>{" "}
          - {sets[set][i]}x
        </li>
      );
    }
    if (set === PROMO) {
      return <li key={`${set}-${i}`}>{i}</li>;
    }

    return <li key={`${set}-${i}`}>{abbrevs[i]}</li>;
  });
};

const PopoverSet = ({ card, set }) => {
  return (
    <div className="flex max-sm:flex-col sm:gap-2">
      <div className="flex flex-col gap-1 p-3 sm:min-w-[220px] sm:p-4">
        <div className="whitespace-nowrap">
          <b>{setsAndPrecons[set][NAME]}</b>
          {![POD, PROMO, PLAYTEST].includes(set) && ` - ${setsAndPrecons[set][DATE].slice(0, 4)}`}
        </div>
        {![POD, PROMO].includes(set) && (
          <ul className="flex flex-col gap-1">
            <PreconsDetailed sets={card[SET]} set={set} />
          </ul>
        )}
      </div>
      <CardImage size="sm" card={card} set={set.toLowerCase().replace(" ", "_")} />
    </div>
  );
};

const PreconsList = ({value}) => {
  return(
    <div className="inline ">
      {Object.keys(value).map(i => {
        const q = value[i]
        return(<div className="inline group">
                                <div className="inline text-midGray dark:text-midGrayDark">{i}</div>
                                <div className="inline font-bold text-midGrayDark dark:text-lightGrayDark">{q}</div>
                                <div className="group-last:hidden inline text-midGray dark:text-midGrayDark">/</div>
                              </div>)
      })}
    </div>
  )
}

const ResultLayoutTextSets = ({ card }) => {
  const { playtestMode } = useApp();
  const byDate = (a, b) => setsAndPrecons[a][DATE] > setsAndPrecons[b][DATE];

  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
      {Object.keys(card[SET])
       .filter((set) => (playtestMode || set !== PLAYTEST) && set !== TWO_P)
       .toSorted(byDate)
       .map((set) => {
         const isPrecons = !!Object.keys(card[SET][set]).length
         const year = setsAndPrecons[set][DATE].slice(2, 4) || null;

         return (
           <div className="inline-block whitespace-nowrap" key={set}>
             <ConditionalTooltipOrModal
               overlay={<PopoverSet card={card} set={set} />}
               placement="bottom"
               size="lg"
               noPadding
             >
               <div className="flex text-fgSecondary dark:text-fgPrimaryDark">
                 {set === PLAYTEST ? "PLAYTEST" : set}
                 <div className="flex items-start text-fgFourth text-sm dark:text-fgFourthDark">
                   {year ? `'${year}` : null}
                 </div>
                 {isPrecons && <div className="flex">
                                             <div className="flex text-midGray dark:text-midGrayDark">:</div><PreconsList value={card[SET][set]}/>
                                           </div>}
               </div>
             </ConditionalTooltipOrModal>
           </div>
         );
        })}
    </div>
  );
};

export default ResultLayoutTextSets;
