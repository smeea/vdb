import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';

const AnalyzeTournamentChartsRankingStyle = ({ info, scores, decks }) => {
  const data = useMemo(() => {
    const d = {};

    [
      'bleed',
      'stealth',
      'block',
      'rush',
      'combat',
      'ally',
      'swarm',
      'vote',
    ].forEach((s) => {
      d[s] = [];

      for (let i = 0; i < info.players; i++) {
        d[s].push({ index: -1, value: 0, rank: info.players - i });
      }
    });

    Object.values(decks).map((deck) => {
      const rank = scores[deck.author].rank;
      const position = info.players - rank;

      deck.tags.superior.forEach((t) => {
        if (d[t]) {
          d[t][position] = {
            index: -1,
            value: 1,
            rank: rank,
          };
        }
      });
      deck.tags.base.forEach((t) => {
        if (d[t]) {
          d[t][position] = {
            index: -1,
            value: 0.5,
            rank: rank,
          };
        }
      });
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

export default AnalyzeTournamentChartsRankingStyle;
