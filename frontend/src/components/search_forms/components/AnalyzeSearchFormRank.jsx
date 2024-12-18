import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { RANK, ANY, FROM, TO } from '@/constants';

const AnalyzeSearchFormRank = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = RANK;
  const steps = ['ANY', '5', '10', '20', '25%', '33%', '50%', '66%', '75%'];

  const fromOptions = steps
    .filter((i) => {
      return (
        i.toLowerCase() === ANY ||
        value[TO] === ANY ||
        !value[TO] ||
        parseInt(i) > value[TO] ||
        (value[TO].includes('%') && i.includes('%') && i > value[TO])
      );
    })
    .map((i) => ({
      value: i.toLowerCase(),
      name: FROM,
      label: <div className="flex justify-center">{i.toLowerCase() == ANY ? i : `Top ${i}`}</div>,
    }));

  const toOptions = steps
    .filter((i) => {
      return (
        i.toLowerCase() === ANY ||
        value[FROM] === ANY ||
        !value[FROM] ||
        parseInt(i) < value[FROM] ||
        (value[FROM].includes('%') && i.includes('%') && i < value[FROM])
      );
    })
    .map((i) => ({
      value: i.toLowerCase(),
      name: TO,
      label: <div className="flex justify-center">{i.toLowerCase() == ANY ? i : `Top ${i}`}</div>,
    }));

  return (
    <>
      <div className="flex basis-full items-center gap-1">
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Place:</div>
        </div>
        <div className="flex w-3/4 items-center gap-1">
          <div className="w-full">
            <Select
              options={fromOptions}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={fromOptions.find((obj) => obj.value === value[FROM])}
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
              value={toOptions.find((obj) => obj.value === value[TO])}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyzeSearchFormRank;
