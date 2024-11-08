import React from 'react';
import { Cell, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ReferenceLine } from 'recharts';
import { BubbleChartTooltip } from '@/components';
import { IN_SEARCH, INDEX, RANK, VALUE } from '@/constants';

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
      <XAxis dataKey={RANK} tick={{ fontSize: 12 }} tickLine={{ transform: 'translate(0, -6)' }} />
      <YAxis
        dataKey={INDEX}
        name={name}
        width={titleWidth}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: name, position: 'insideRight' }}
      />
      <ZAxis dataKey={VALUE} range={[0, 85]} />
      <ReferenceLine x={refLine} strokeWidth={2} stroke="#ff00aa" />
      <Tooltip
        cursor={null}
        position={{ x: 0, y: 45 }}
        wrapperStyle={{ zIndex: 100 }}
        contentStyle={{
          padding: '2px 9px 2px 2px',
          border: '1px solid #606070',
          background: '#404050',
        }}
        itemStyle={{ color: 'white' }}
        content={<BubbleChartTooltip />}
        isAnimationActive={false}
      />
      <Scatter data={data}>
        {data.map((d, idx) => (
          <Cell key={`${name}-${idx}`} fill={d[IN_SEARCH] ? '#ff4040' : '#8884d8'} />
        ))}
      </Scatter>
    </ScatterChart>
  );
};

export default BubbleChart;
