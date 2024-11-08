import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts';
import { NAME } from '@/constants';
const SEEN = 'seen';
const NOT_SEEN = 'notSeen';

const ChartTooltip = ({ active, payload }) => {
  const value = payload?.[0]?.payload;
  return (
    <div className="z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 dark:border-bgSecondaryDark dark:bg-bgPrimaryDark">
      {active && (
        <div className="flex flex-col gap-2 p-1">
          <div className="flex justify-between gap-2 text-[#6565cc]">
            Seen: <div className="flex">{value[SEEN]}</div>
          </div>
          <div className="flex justify-between gap-2 text-[#d57020]">
            Not Seen: <div className="flex">{value[NOT_SEEN]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const PlaytestScoresChart = ({ value, maxSameScore }) => {
  const data = useMemo(() => {
    const d = Array.apply(null, Array(10)).map((_, i) => {
      return {
        [NAME]: i + 1,
        [SEEN]: 0,
        [NOT_SEEN]: 0,
      };
    });

    Object.values(value).forEach((v) => {
      const { isPlayed, score } = v;
      if (!score) return;

      if (isPlayed) {
        d[score - 1][SEEN] += 1;
      } else {
        d[score - 1][NOT_SEEN] += 1;
      }
    });

    return d;
  }, [value]);

  return (
    <BarChart
      width={320}
      height={250}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 15,
      }}
      isAnimationActive={false}
    >
      <XAxis dataKey={NAME}>
        <Label value="Score" offset={0} position="bottom" />
      </XAxis>
      <YAxis label="#" type="number" domain={[0, maxSameScore]} allowDataOverflow />
      <Tooltip
        content={<ChartTooltip />}
        contentStyle={{
          padding: '6px',
          border: '1px solid #606070',
          borderRadius: '5px',
          background: '#404050',
        }}
        itemStyle={{ color: 'white' }}
      />
      <Legend align="right" verticalAlign="top" />
      <Bar name="Seen in Play" dataKey="seen" stackId="a" fill="#6565cc" />
      <Bar name="Not Seen" dataKey="notseen" stackId="a" fill="#d57020" />
    </BarChart>
  );
};

export default PlaytestScoresChart;
