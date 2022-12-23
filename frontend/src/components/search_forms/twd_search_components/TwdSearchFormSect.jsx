import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const TwdSearchFormSect = ({ value, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const name = 'sect';
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = [
    'ANY',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i}
      </div>
    ),
  }));

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Sect:</div>
      </div>
      <div className="w-3/4">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={!isMobile}
          name={name}
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormSect;
