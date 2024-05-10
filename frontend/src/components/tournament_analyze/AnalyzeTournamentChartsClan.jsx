import React, { useMemo } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { getClan } from '@/utils';
import { useApp } from '@/context';

const AnalyzeTournamentChartsClan = ({ decks }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const data = useMemo(() => {
    const result = {};

    Object.values(decks).forEach((deck) => {
      const clan = getClan(deck.crypt) || 'Multi';
      if (result[clan]) {
        result[clan] += 1;
      } else {
        result[clan] = 1;
      }
    });

    return Object.keys(result)
      .map((c) => {
        return {
          name: isMobile && c.includes('antitribu') ? '!' + c.replace(' antitribu', '') : c,
          value: result[c],
        };
      })
      .toSorted((a, b) => a.name > b.name)
      .toSorted((a, b) => b.value > a.value);
  }, [decks]);

  return (
    <PieChart
      width={isMobile || (isDesktop && !isWide) ? 400 : 620}
      height={isMobile || (isDesktop && !isWide) ? 250 : 365}
    >
      <Pie
        isAnimationActive={false}
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={isMobile || (isDesktop && !isWide) ? 90 : 150}
        fill="#8884d8"
        label={({ index }) => data[index].name}
      />
      <Tooltip
        contentStyle={{
          padding: '2px 9px 2px 2px',
          border: '1px solid #606070',
          background: '#404050',
        }}
        itemStyle={{ color: 'white' }}
      />
    </PieChart>
  );
};

export default AnalyzeTournamentChartsClan;
