import React from 'react';
import {
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  // Tooltip
} from 'recharts';

const BubbleChart = ({ data, name, width, titleWidth }) => {
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
      <ZAxis dataKey="value" range={[0, 60]} />
      {/* TODO tooltip with clan / style */}
      {/* <Tooltip */}
      {/*   cursor={null} */}
      {/*   wrapperStyle={{ zIndex: 100 }} */}
      {/*   contentStyle={{ */}
      {/*     padding: '2px 9px 2px 2px', */}
      {/*     border: '1px solid #606070', */}
      {/*     background: '#404050', */}
      {/*   }} */}
      {/*   itemStyle={{ color: 'white' }} */}
      {/* /> */}
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
