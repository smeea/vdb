import React from 'react';
import { Select } from '@/components';
import { CAPACITY, ANY, LE, GE } from '@/constants';

const LibrarySearchFormCapacity = ({ value, onChange }) => {
  const name = CAPACITY;
  const options = ['ANY', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: <div className="flex justify-center">{i}</div>,
  }));

  const morelessOptions = [
    [LE, '<='],
    [GE, '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: <div className="flex justify-center">{i[1]}</div>,
  }));

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Capacity:</div>
      </div>
      <div className="flex w-3/4 gap-1">
        <div className="w-1/2">
          <Select
            options={morelessOptions}
            isSearchable={false}
            name={0}
            value={morelessOptions.find((obj) => obj.value === value.moreless)}
            onChange={onChange}
          />
        </div>
        <div className="w-1/2">
          <Select
            options={options}
            isSearchable={false}
            isClearable={value[name] !== ANY}
            name={0}
            value={options.find((obj) => obj.value === value[name])}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
    </div>
  );
};

export default LibrarySearchFormCapacity;
