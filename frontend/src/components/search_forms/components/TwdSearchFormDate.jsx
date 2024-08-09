import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { FROM, TO } from '@/utils/constants';

const TwdSearchFormDate = ({ inPda, value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'date';
  const currentYear = new Date().getFullYear();
  const TWD_START = 1997;
  const PDA_START = 2022;

  const years = ['ANY'];

  if (inPda) {
    for (let i = currentYear; i >= PDA_START; i--) {
      years.push(i.toString());
    }
  } else {
    for (let i = currentYear; i >= TWD_START; i--) {
      years.push(i.toString());
    }
  }

  const fromOptions = [];
  const toOptions = [];

  years.map((i) => {
    if (i === 'ANY' || value.to === 'any' || parseInt(i) <= value.to) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: FROM,
        label: <div className="flex justify-center">{i}</div>,
      });
    }

    if (i === 'ANY' || value.from === 'any' || parseInt(i) >= value.from) {
      toOptions.push({
        value: i.toLowerCase(),
        name: TO,
        label: <div className="flex justify-center">{i}</div>,
      });
    }
  });

  return (
    <div className="flex items-center space-x-1">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Year:</div>
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
  );
};

export default TwdSearchFormDate;
