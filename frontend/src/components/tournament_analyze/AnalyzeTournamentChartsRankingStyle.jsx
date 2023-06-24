import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';

const AnalyzeTournamentChartsRankingStyle = ({
  info,
  decks,
  searchResults,
}) => {
  const allowedTags = [
    'bleed',
    'stealth',
    'block',
    'rush',
    'combat',
    'ally',
    'swarm',
    'vote',
  ];

  const data = useMemo(() => {
    const d = {};

    allowedTags.forEach((s) => {
      d[s] = [];
      for (let i = 0; i < info.players; i++) {
        d[s].push({ index: -1, value: 0, rank: info.players - i });
      }
    });

    Object.values(decks).map((deck) => {
      const position = info.players - deck.score.rank;
      const inSearch = Object.values(searchResults).some(
        (d) => d.author === deck.author
      );

      deck.tags.superior
        .filter((t) => allowedTags.includes(t))
        .forEach((t) => {
          d[t][position] = {
            inSearch: inSearch,
            index: -1,
            value: 1,
            rank: deck.score.rank,
          };
        });
      deck.tags.base
        .filter((t) => allowedTags.includes(t))
        .forEach((t) => {
          d[t][position] = {
            inSearch: inSearch,
            index: -1,
            value: 0.5,
            rank: deck.score.rank,
          };
        });
    });
    return d;
  }, [searchResults, decks, info]);

  return (
    <div className="flex basis-full flex-col py-4">
      {Object.keys(data).map((s) => {
        return (
          <BubbleChart
            key={s}
            data={data[s]}
            name={s[0].toUpperCase() + s.slice(1)}
            width={600}
            titleWidth={80}
          />
        );
      })}
    </div>
  );
};

export default AnalyzeTournamentChartsRankingStyle;
