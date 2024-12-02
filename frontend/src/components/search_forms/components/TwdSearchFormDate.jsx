import React from 'react';
import dayjs from 'dayjs';
import { Select } from '@/components';
import { useApp } from '@/context';
import { DATE, ANY, FROM, TO } from '@/constants';

const TwdSearchFormDate = ({ inPda, value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = DATE;
  const currentYear = dayjs().format('YYYY');
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
    if (i.toLowerCase() === ANY || value.to === ANY || parseInt(i) <= value.to) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: FROM,
        label: <div className="flex justify-center">{i}</div>,
      });
    }

    if (i.toLowerCase() === ANY || value.from === ANY || parseInt(i) >= value.from) {
      toOptions.push({
        value: i.toLowerCase(),
        name: TO,
        label: <div className="flex justify-center">{i}</div>,
      });
    }
  });

  return (
    <div className="flex items-center gap-1">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Year:</div>
      </div>
      <div className="flex w-3/4 items-center gap-1">
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
