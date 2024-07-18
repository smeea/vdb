import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';
import { capitalize, getClan } from '@/utils';
import { useApp } from '@/context';

const AnalyzeTournamentChartsRankingStyle = ({ info, decks, searchResults }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const allowedTags = ['bleed', 'stealth', 'block', 'rush', 'combat', 'ally', 'swarm', 'vote'];

  const data = useMemo(() => {
    const d = {};

    allowedTags.forEach((s) => {
      d[s] = [];
      for (let i = 0; i < info.players; i++) {
        d[s].push({ index: -1, value: 0, rank: info.players - i });
      }
    });

    Object.values(decks).forEach((deck) => {
      const position = info.players - deck.score.rank;
      const inSearch = Object.values(searchResults).some((d) => d.author === deck.author);
      const def = {
        clan: getClan(deck.crypt) || 'Multi',
        crypt: deck.crypt,
        library: deck.library,
        tags: deck.tags,
        inSearch: inSearch,
        rank: deck.score.rank,
        index: -1,
      };

      deck.tags.superior
        .filter((t) => allowedTags.includes(t))
        .forEach((t) => {
          d[t][position] = {
            ...def,
            value: 1,
          };
        });
      deck.tags.base
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
