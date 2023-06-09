import React, { useMemo } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { getClan } from '@/utils';

const AnalyzeTournamentChartsClan = ({ decks }) => {
  const data = useMemo(() => {
    const result = {};

    Object.values(decks).map((deck) => {
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
          name: c,
          value: result[c],
        };
      })
      .sort((a, b) => a.name > b.name)
      .sort((a, b) => b.value > a.value);
  }, [decks]);

  return (
    <PieChart width={600} height={360}>
      <Pie
        isAnimationActive={false}
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={150}
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
