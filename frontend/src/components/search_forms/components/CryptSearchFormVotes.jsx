import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { ANY } from '@/utils/constants';

const CryptSearchFormVotes = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const name = 'votes';
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = [
    [ANY, 'ANY'],
    ['0', 'None'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i[1]}
      </div>
    ),
  }));

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Votes:</div>
      </div>
      <div className="w-3/4">
        <Select
          options={options}
          isSearchable={false}
          isClearable={value !== ANY}
          name={name}
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={(e) => onChange(e ?? { name: name, value: ANY })}
        />
      </div>
    </div>
  );
};

export default CryptSearchFormVotes;
