import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const TwdSearchFormDate = ({ inPda, value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'date';
  const noPdaYears = [
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
  ];
  const years = ['ANY', '2022'];
  if (!inPda) years.push(...noPdaYears);

  const fromOptions = [];
  const toOptions = [];

  years.map((i) => {
    if (i === 'ANY' || value.to === 'any' || parseInt(i) <= value.to) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: 'from',
        label: <div className="flex justify-center">{i}</div>,
      });
    }

    if (i === 'ANY' || value.from === 'any' || parseInt(i) >= value.from) {
      toOptions.push({
        value: i.toLowerCase(),
        name: 'to',
        label: <div className="flex justify-center">{i}</div>,
      });
    }
  });

  return (
    <div className="flex items-center space-x-1">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Year:</div>
      </div>
      <div className="flex w-3/4 items-center space-x-1">
        <div className="w-full">
          <Select
            classNamePrefix="react-select"
            options={fromOptions}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={fromOptions.find((obj) => obj.value === value.from)}
            onChange={onChange}
          />
        </div>
        <div className="text-xs">to</div>
        <div className="w-full">
          <Select
            classNamePrefix="react-select"
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
