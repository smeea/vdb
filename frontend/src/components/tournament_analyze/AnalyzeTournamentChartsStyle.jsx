import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { useApp } from '@/context';

const AnalyzeTournamentChartsStyle = ({ decks }) => {
  const { isMobile } = useApp();
  const data = useMemo(() => {
    const qty = Object.keys(decks).length;
    const result = {};

    Object.values(decks).map((deck) => {
      deck.tags.superior.forEach((t) => {
        if (result[t]) {
          result[t] += 1.5;
        } else {
          result[t] = 1.5;
        }
      });
      deck.tags.base.forEach((t) => {
        if (result[t]) {
          result[t] += 1;
        } else {
          result[t] = 1;
        }
      });
    });

    return [
      {
        name: 'Bleed',
        value: result.bleed / qty || 0,
      },
      {
        name: 'Stealth',
        value: result.stealth / qty || 0,
      },
      {
        name: 'Block',
        value: result.block / qty || 0,
      },
      {
        name: 'Rush',
        value: result.rush / qty || 0,
      },
      {
        name: 'Combat',
        value: result.combat / qty || 0,
      },
      {
        name: 'Ally',
        value: result.ally / qty || 0,
      },
      {
        name: 'Swarm',
        value: result.swarm / qty || 0,
      },
      {
        name: 'Vote',
        value: result.vote / qty || 0,
      },
    ];
  }, [decks]);

  return (
    <RadarChart
      width={isMobile ? 300 : 450}
      height={isMobile ? 230 : 365}
      cx="50%"
      cy="50%"
      outerRadius={isMobile ? 90 : 150}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis axisLine={false} dataKey="name" />
      <Radar
        isAnimationActive={false}
        name="Playstyle"
        dataKey="value"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.7}
      />
    </RadarChart>
  );
};

export default AnalyzeTournamentChartsStyle;
