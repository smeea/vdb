import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import { ResultLegalIcon } from "@/components";
import { LEGAL_RESTRICTIONS, ADV, BANNED, CRYPT, ID, LIBRARY, NAME, PLAYTEST } from "@/constants";
import { limitedStore, useApp } from "@/context";

const ResultName = ({ card, isColored = true }) => {
  const { limitedMode } = useApp();
  const limitedState = useSnapshot(limitedStore)[card[ID] > 200000 ? CRYPT : LIBRARY];
  const isLimited = limitedMode && !limitedState[card[ID]];

  return (
    <div
      className={twMerge(
        "inline-flex items-center gap-1 whitespace-nowrap print:dark:text-fgName",
        isColored && "text-fgName dark:text-fgNameDark",
      )}
    >
      <div
        className={twMerge(
          "inline whitespace-normal",
          (card[BANNED] || isLimited) && "line-through",
        )}
      >
        {card[NAME]}
      </div>
      {card[ID] > 200000 && card[ADV][0] && (
        <div className="inline whitespace-nowrap">
          <img
            aria-label="Advanced"
            className="mb-1 inline"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
            width="12"
          />
        </div>
      )}
      {card[BANNED] && <ResultLegalIcon type={BANNED} value={card[BANNED]} />}
      {isLimited && <ResultLegalIcon title="Limited" />}
      {card[LEGAL_RESTRICTIONS] && <ResultLegalIcon type={PLAYTEST} value={card[LEGAL_RESTRICTIONS]} />}
    </div>
  );
};

export default ResultName;
