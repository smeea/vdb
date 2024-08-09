import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { FROM, TO } from '@/utils/constants';

const AnalyzeSearchFormRank = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'rank';
  const fromOptions = [];
  const toOptions = [];

  ['ANY', '5', '10', '15', '25%', '33%', '50%', '66%', '75%'].map((i) => {
    if (
      i === 'ANY' ||
      value.to === 'any' ||
      parseInt(i) > value.to ||
      (value.to.includes('%') && i.includes('%') && i > value.to)
    ) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: FROM,
        label: <div className="flex justify-center">{i == 'ANY' ? i : `Top ${i}`}</div>,
      });
    }

    if (
      i === 'ANY' ||
      value.from === 'any' ||
      parseInt(i) < value.from ||
      (value.from.includes('%') && i.includes('%') && i < value.from)
    ) {
      toOptions.push({
        value: i.toLowerCase(),
        name: TO,
        label: <div className="flex justify-center">{i == 'ANY' ? i : `Top ${i}`}</div>,
      });
    }
  });

  return (
    <>
      <div className="flex basis-full items-center space-x-1">
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Place:</div>
        </div>
        <div className="flex w-3/4 items-center space-x-1">
          <div className="w-full">
            <Select
              options={fromOptions}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={fromOptions.find((obj) => obj.value === value.from)}
              onChange={onChange}
            />
          </div>
          <div className="px-1">to</div>
          <div className="w-full">
            <Select
              options={toOptions}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={toOptions.find((obj) => obj.value === value.to)}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyzeSearchFormRank;
