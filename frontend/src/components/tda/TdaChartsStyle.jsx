import { useMemo } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { BASE, NAME, SUPERIOR, TAGS, VALUE } from '@/constants';
import { useApp } from '@/context';

const TdaChartsStyle = ({ decks }) => {
  const { isMobile, isDesktop, isWide } = useApp();
  const data = useMemo(() => {
    const qty = Object.keys(decks).length;
    const result = {};

    Object.values(decks).forEach((deck) => {
      deck[TAGS][SUPERIOR].forEach((t) => {
        if (result[t]) {
          result[t] += 1.5;
        } else {
          result[t] = 1.5;
        }
      });
      deck[TAGS][BASE].forEach((t) => {
        if (result[t]) {
          result[t] += 1;
        } else {
          result[t] = 1;
        }
      });
    });

    return [
      {
        [NAME]: 'Bleed',
        [VALUE]: result.bleed / qty || 0,
      },
      {
        [NAME]: 'Stealth',
        [VALUE]: result.stealth / qty || 0,
      },
      {
        [NAME]: 'Block',
        [VALUE]: result.block / qty || 0,
      },
      {
        [NAME]: 'Rush',
        [VALUE]: result.rush / qty || 0,
      },
      {
        [NAME]: 'Combat',
        [VALUE]: result.combat / qty || 0,
      },
      {
        [NAME]: 'Ally',
        [VALUE]: result.ally / qty || 0,
      },
      {
        [NAME]: 'Swarm',
        [VALUE]: result.swarm / qty || 0,
      },
      {
        [NAME]: 'Vote',
        [VALUE]: result.vote / qty || 0,
      },
    ];
  }, [decks]);

  return (
    <RadarChart
      width={isMobile || (isDesktop && !isWide) ? 300 : 450}
      height={isMobile || (isDesktop && !isWide) ? 230 : 365}
      cx="50%"
      cy="50%"
      outerRadius={isMobile || (isDesktop && !isWide) ? 90 : 150}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis axisLine={false} dataKey={NAME} />
      <Radar
        isAnimationActive={false}
        name="Playstyle"
        dataKey={VALUE}
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.7}
      />
    </RadarChart>
  );
};

export default TdaChartsStyle;
