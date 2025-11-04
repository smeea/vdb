import { BubbleChart } from "@/components";
import {
  ALLY,
  AUTHOR,
  BASE,
  BLEED,
  BLOCK,
  CLAN,
  COMBAT,
  CRYPT,
  IN_SEARCH,
  INDEX,
  LIBRARY,
  MULTI,
  PLAYERS,
  RANK,
  RUSH,
  SCORE,
  STEALTH,
  SUPERIOR,
  SWARM,
  TAGS,
  VALUE,
  VOTE,
} from "@/constants";
import { useApp } from "@/context";
import { capitalize, deepClone, getClan } from "@/utils";

const TdaChartsRankingStyle = ({ info, decks, searchResults }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const allowedTags = [BLEED, STEALTH, BLOCK, RUSH, COMBAT, ALLY, SWARM, VOTE];

  const d = {};

  allowedTags.forEach((s) => {
    d[s] = [];
    for (let i = 0; i < info[PLAYERS]; i++) {
      d[s].push({ [INDEX]: -1, [VALUE]: 0, [RANK]: info[PLAYERS] - i });
    }
  });

  Object.values(decks).forEach((deck) => {
    const position = info[PLAYERS] - deck[SCORE][RANK];
    const inSearch = Object.values(searchResults).some((d) => d[AUTHOR] === deck[AUTHOR]);
    const def = {
      [CLAN]: getClan(deck[CRYPT]) || MULTI,
      [CRYPT]: deck[CRYPT],
      [LIBRARY]: deck[LIBRARY],
      [TAGS]: deck[TAGS],
      [IN_SEARCH]: inSearch,
      [RANK]: deck[SCORE][RANK],
      [INDEX]: -1,
    };

    deck[TAGS][SUPERIOR]
      .filter((t) => allowedTags.includes(t))
      .forEach((t) => {
        d[t][position] = {
          ...def,
          [VALUE]: 1,
        };
      });
    deck[TAGS][BASE]
      .filter((t) => allowedTags.includes(t))
      .forEach((t) => {
        d[t][position] = {
          ...def,
          [VALUE]: 0.4,
        };
      });
  });

  const data = deepClone(d);

  return (
    <div className="flex basis-full flex-col items-center">
      {Object.keys(data).map((s) => {
        return (
          <BubbleChart
            key={s}
            data={data[s]}
            name={capitalize(s)}
            refLine={info.medianReportedRank}
            titleWidth={80}
            width={isMobile || (isDesktop && !isWide) ? 370 : 600}
          />
        );
      })}
    </div>
  );
};

export default TdaChartsRankingStyle;
