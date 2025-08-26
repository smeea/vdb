import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  DeckChangeAuthor,
  DeckChangeBranchName,
  DeckChangeDescription,
  DeckChangeName,
  DeckTags,
  PlaytestReportForm,
} from "@/components";
import {
  DECKID,
  IS_AUTHOR,
  IS_BRANCHES,
  IS_PUBLIC,
  PLAYTEST,
  PLAYTEST_OLD,
  TAGS,
} from "@/constants";
import { useApp } from "@/context";

const DeckDetails = ({ deck, allTagsOptions = [] }) => {
  const { isPlaytester, isMobile } = useApp();
  const [isFolded, setIsFolded] = useState(!isMobile);
  const playtestPrecon =
    deck[DECKID].includes(`${PLAYTEST}:`) &&
    !deck[PLAYTEST_OLD] &&
    deck[DECKID].replace(`${PLAYTEST}:`, "");

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-2 max-sm:flex-col">
        <div
          className={twMerge("basis-full", deck[IS_BRANCHES] ? "sm:basis-6/12" : "sm:basis-8/12")}
        >
          <DeckChangeName deck={deck} />
        </div>
        <div
          className={twMerge(
            "flex basis-full gap-2 max-sm:flex-col",
            deck[IS_BRANCHES] ? "sm:basis-6/12" : "sm:basis-4/12",
          )}
        >
          {deck[IS_BRANCHES] && (
            <div className="basis-full sm:basis-4/12">
              <DeckChangeBranchName deck={deck} />
            </div>
          )}
          <div className="basis-full">
            <DeckChangeAuthor deck={deck} />
          </div>
        </div>
      </div>
      <div className={twMerge("flex gap-2", (!isFolded || isMobile) && "flex-col")}>
        {isPlaytester && playtestPrecon ? (
          <div className="basis-full">
            <PlaytestReportForm deck={deck} id={playtestPrecon} isPrecon />
          </div>
        ) : (
          <>
            <div className="basis-full sm:basis-6/12">
              <DeckChangeDescription deck={deck} isFolded={isFolded} setIsFolded={setIsFolded} />
            </div>
            {(deck[TAGS]?.length > 0 || deck[IS_AUTHOR] || !deck[IS_PUBLIC]) && (
              <div className="basis-full sm:z-20 sm:basis-6/12">
                <DeckTags deck={deck} allTagsOptions={allTagsOptions} isBordered />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeckDetails;
