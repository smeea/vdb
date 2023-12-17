import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';

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
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Sect:
        </div>
      </div>
      <div className="w-3/4">
        <Select
          isClearable={value !== 'any'}
          options={options}
          isSearchable={!isMobile}
          name={name}
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={(e) => onChange(e ?? { name: name, value: 'any' })}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormSect;
