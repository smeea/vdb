import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';
import { capitalize, getClan } from '@/utils';
import { useApp } from '@/context';
import {
  ALLY,
  AUTHOR,
  BLEED,
  BLOCK,
  COMBAT,
  CRYPT,
  LIBRARY,
  MULTI,
  PLAYERS,
  RANK,
  RUSH,
  STEALTH,
  SWARM,
  TAGS,
  VOTE,
} from '@/constants';

const AnalyzeTournamentChartsRankingStyle = ({ info, decks, searchResults }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const allowedTags = [BLEED, STEALTH, BLOCK, RUSH, COMBAT, ALLY, SWARM, VOTE];

  const data = useMemo(() => {
    const d = {};

    allowedTags.forEach((s) => {
      d[s] = [];
      for (let i = 0; i < info[PLAYERS]; i++) {
        d[s].push({ index: -1, value: 0, rank: info[PLAYERS] - i });
      }
    });

    Object.values(decks).forEach((deck) => {
      const position = info[PLAYERS] - deck.score[RANK];
      const inSearch = Object.values(searchResults).some((d) => d[AUTHOR] === deck[AUTHOR]);
      const def = {
        clan: getClan(deck[CRYPT]) || MULTI,
        crypt: deck[CRYPT],
        library: deck[LIBRARY],
        tags: deck[TAGS],
        inSearch: inSearch,
        rank: deck.score[RANK],
        index: -1,
      };

      deck[TAGS].superior
        .filter((t) => allowedTags.includes(t))
        .forEach((t) => {
          d[t][position] = {
            ...def,
            value: 1,
          };
        });
      deck[TAGS].base
        .filter((t) => allowedTags.includes(t))
        .forEach((t) => {
          d[t][position] = {
            ...def,
            value: 0.55,
          };
        });
    });
    return d;
  }, [searchResults, decks, info]);

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

export default AnalyzeTournamentChartsRankingStyle;
