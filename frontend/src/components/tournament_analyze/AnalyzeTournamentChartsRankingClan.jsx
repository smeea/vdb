import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';
import { getClan } from '@/utils';

const AnalyzeTournamentChartsRankingClan = ({ info, scores, decks }) => {
  const data = useMemo(() => {
    const d = {};

    Object.values(decks).map((deck) => {
      const rank = scores[deck.author].rank;
      const position = info.players - rank;
      const clan = getClan(deck.crypt) || 'Multi';

      if (!d[clan]) {
        d[clan] = [];
        for (let i = 0; i < info.players; i++) {
          d[clan].push({ index: -1, value: 0, rank: info.players - i });
        }
      }

      d[clan][position] = {
        index: -1,
        value: 1,
        rank: rank,
      };
    });

    return d;
  }, [decks, info, scores]);

  return (
    <div className="flex flex-col basis-full py-4">
      {Object.keys(data).map((s) => {
        return (
          <BubbleChart
            key={s}
            data={data[s]}
            name={s[0].toUpperCase() + s.slice(1)}
          />
        );
      })}
    </div>
  );
};

export default AnalyzeTournamentChartsRankingClan;
