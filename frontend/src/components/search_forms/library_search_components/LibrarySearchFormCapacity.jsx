import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormCapacity = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'capacity';
  const options = [
    'ANY',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ].map((i) => ({
    value: i === 'ANY' ? i.toLowerCase() : i,
    name: name,
    label: (
      <>
        <span className="  " />
        {i}
      </>
    ),
  }));

  const morelessOptions = [
    ['le', '<='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <>
        <span className="  " />
        {i[1]}
      </>
    ),
  }));

  return (
    <div className="flex flex-row items-center">
      <div className="flex basis-1/4">
        <div className="text-blue font-bold">Capacity:</div>
      </div>
      <div className="inline basis-1/3">
        <Select
          classNamePrefix="react-select"
          options={morelessOptions}
          isSearchable={false}
          name={0}
          value={morelessOptions.find((obj) => obj.value === value.moreless)}
          onChange={onChange}
        />
      </div>
      <div className="inline basis-5/12">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name={0}
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value[name])}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default LibrarySearchFormCapacity;
