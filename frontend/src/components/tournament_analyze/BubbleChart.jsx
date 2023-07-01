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
import { useApp } from '@/context';
import { useDeckCrypt } from '@/hooks';
import {
  TwdResultCryptTableRow,
  TwdResultLibraryKeyCardsTableRow,
  TwdResultTags,
} from '@/components';
import { librarySort } from '@/utils';
import { GROUPED_TYPE, ASCII_NAME } from '@/utils/constants';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload;

    const { cryptDeckSort } = useApp();
    const { sortedCards: sortedCryptCards } = useDeckCrypt(
      value.crypt,
      cryptDeckSort,
      true
    );
    const sortedLibrary = librarySort(
      Object.values(value.library),
      GROUPED_TYPE
    );
    const keyLibraryCards = sortedLibrary.filter((card) => card.q >= 4);

    return (
      <div
        className={`z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark`}
      >
        <div className="flex flex-col gap-2 p-1">
          <div className="flex items-center justify-between text-fgSecondary dark:text-fgSecondaryDark">
            <div />
            <div className="font-bold">{value.clan}</div>
            <div className="rounded-lg border px-2 py-0.5">
              <b># {value.rank}</b>
            </div>
          </div>
          <div className="flex text-sm text-fgPrimary dark:text-fgPrimaryDark gap-2">
            <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
              <tbody>
                {sortedCryptCards.map((card, idx) => {
                  return (
                    <TwdResultCryptTableRow
                      key={card.c.Id}
                      card={card}
                      idx={idx}
                    />
                  );
                })}
              </tbody>
            </table>
            <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
              <tbody>
                {keyLibraryCards
                  .sort((a, b) => a.c[ASCII_NAME] - b.c[ASCII_NAME])
                  .map((card, idx) => {
                    return (
                      <TwdResultLibraryKeyCardsTableRow
                        key={card.c.Id}
                        card={card}
                        idx={idx}
                      />
                    );
                  })}
              </tbody>
            </table>
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
