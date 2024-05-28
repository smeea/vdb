import React, { useMemo } from 'react';
import { BubbleChart } from '@/components';
import { getClan } from '@/utils';
import { useApp } from '@/context';

const AnalyzeTournamentChartsRankingClan = ({ info, decks, searchResults }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const data = useMemo(() => {
    const d = {};

    Object.values(decks).forEach((deck) => {
      const position = info.players - deck.score.rank;
      const inSearch = Object.values(searchResults).some((d) => d.author === deck.author);
      const clan = getClan(deck.crypt) || 'Multi';

      if (!d[clan]) {
        d[clan] = [];
        for (let i = 0; i < info.players; i++) {
          d[clan].push({ index: -1, value: 0, rank: info.players - i });
        }
      }

      d[clan][position] = {
        clan: clan,
        crypt: deck.crypt,
        library: deck.library,
        tags: deck.tags,
        inSearch: inSearch,
        index: -1,
        value: 1,
        rank: deck.score.rank,
      };
    });

    return d;
  }, [searchResults, decks, info]);

  return (
    <div className="flex basis-full items-center flex-col">
      {Object.keys(data)
        .toSorted((a, b) => a.localeCompare(b, 'en'))
        .map((s) => {
          const clan = isMobile && s.includes('antitribu') ? '!' + s.replace(' antitribu', '') : s;

          return (
            <BubbleChart
              key={s}
              data={data[s]}
              name={clan}
              refLine={info.medianReportedRank}
              titleWidth={isMobile || (isDesktop && !isWide) ? 105 : 160}
              width={isMobile || (isDesktop && !isWide) ? 370 : 600}
            />
          );
        })}
    </div>
  );
};

export default AnalyzeTournamentChartsRankingClan;
