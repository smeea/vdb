import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';
import { getClan } from '@/utils';

const AnalyzeTournamentChartsRankingClan = ({ info, decks, searchResults }) => {
  const data = useMemo(() => {
    const d = {};

    Object.values(decks).map((deck) => {
      const position = info.players - deck.score.rank;
      const inSearch = Object.values(searchResults).some(
        (d) => d.author === deck.author
      );
      const clan = getClan(deck.crypt) || 'Multi';

      if (!d[clan]) {
        d[clan] = [];
        for (let i = 0; i < info.players; i++) {
          d[clan].push({ index: -1, value: 0, rank: info.players - i });
        }
      }

      d[clan][position] = {
        inSearch: inSearch,
        index: -1,
        value: 1,
        rank: deck.score.rank,
      };
    });

    return d;
  }, [searchResults, decks, info]);

  return (
    <div className="flex basis-full flex-col py-4">
      {Object.keys(data)
        .sort((a, b) => a.localeCompare(b))
        .map((s) => {
          return (
            <BubbleChart
              key={s}
              data={data[s]}
              name={s[0].toUpperCase() + s.slice(1)}
              width={600}
              titleWidth={160}
            />
          );
        })}
    </div>
  );
};

export default AnalyzeTournamentChartsRankingClan;
