import React from 'react';
import {
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { TwdResultTags } from '@/components';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload;

    return (
      <div
        className={`z-50 rounded-md border border-bgSecondary bg-bgPrimary text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark p-1 flex flex-col gap-0.5`}
      >
        <div className="px-1 pt-1.5 gap-0.5">
          <div className="flex items-center justify-between gap-1.5 dark:text-fgSecondaryDark text-fgSecondary">
            <div className="flex">
              <b>{value.clan}</b>
            </div>
            <div className="flex rounded-lg border px-1">
              <b># {value.rank}</b>
            </div>
          </div>
          <div className="flex text-sm flex-col text-fgPrimary dark:text-fgPrimaryDark">
            {Object.values(value.crypt).map((c) => {
              return (
                <div key={c.c.Id}>
                  {c.q}x {c.c.Name}
                </div>
              );
            })}
          </div>
        </div>
        {value.tags &&
          (value.tags.superior.length > 0 || value.tags.base.length > 0) && (
            <TwdResultTags tags={value.tags} />
          )}
      </div>
    );
  }

  return null;
};

const BubbleChart = ({ data, name, width, titleWidth, refLine }) => {
  return (
    <ScatterChart
      width={width}
      height={50}
      margin={{
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <XAxis
        dataKey="rank"
        tick={{ fontSize: 12 }}
        tickLine={{ transform: 'translate(0, -6)' }}
      />
      <YAxis
        dataKey="index"
        name={name}
        width={titleWidth}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: name, position: 'insideRight' }}
      />
      <ZAxis dataKey="value" range={[0, 85]} />
      <ReferenceLine x={refLine} strokeWidth={2.5} stroke="#ff00aa" />
      <Tooltip
        cursor={null}
        wrapperStyle={{ zIndex: 100 }}
        contentStyle={{
          padding: '2px 9px 2px 2px',
          border: '1px solid #606070',
          background: '#404050',
        }}
        itemStyle={{ color: 'white' }}
        content={<CustomTooltip />}
        isAnimationActive={false}
      />
      <Scatter data={data}>
        {data.map((d, idx) => (
          <Cell
            key={`{name}-${idx}`}
            fill={d.inSearch ? '#ff4040' : '#8884d8'}
          />
        ))}
      </Scatter>
    </ScatterChart>
  );
};

export default BubbleChart;
