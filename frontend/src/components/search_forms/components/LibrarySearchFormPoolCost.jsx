import React from 'react';
import { Select } from '@/components';
import { useApp } from '@/context';
import { ANY, LE, GE, EQ } from '@/constants';

const LibrarySearchFormPoolCost = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'pool';
  const options = ['ANY', '0', '1', '2', '3', '4', '5', '6'].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: <div className="flex justify-center">{i}</div>,
  }));

  const morelessOptions = [
    [LE, '<='],
    [EQ, '=='],
    [GE, '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: <div className="flex justify-center">{i[1]}</div>,
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Pool Cost:</div>
        </div>
        <div className="flex w-3/4 gap-1">
          <div className="w-1/2">
            <Select
              options={morelessOptions}
              isSearchable={false}
              name={`${name}-moreless`}
              value={morelessOptions.find((obj) => obj.value === value.moreless)}
              onChange={onChange}
            />
          </div>
          <div className="w-1/2">
            <Select
              options={options}
              isSearchable={false}
              isClearable={value[name] !== ANY}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={options.find((obj) => obj.value === value[name])}
              onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrarySearchFormPoolCost;
