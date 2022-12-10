import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormPoolCost = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'pool';
  const options = ['ANY', '0', '1', '2', '3', '4', '5', '6'].map((i) => ({
    value: i === 'ANY' ? i.toLowerCase() : i,
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-1 me-lg-3" />
        {i}
      </>
    ),
  }));

  const morelessOptions = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-0 me-lg-3" />
        {i[1]}
      </>
    ),
  }));

  return (
    <>
      <div className="pl-1 mx-0 flex flex-row items-center py-1">
        <div className="flex basis-1/4 px-0">
          <div className="text-blue font-bold">Pool Cost:</div>
        </div>
        <div className="inline basis-1/3 px-0">
          <Select
            classNamePrefix="react-select"
            options={morelessOptions}
            isSearchable={false}
            name={`${name}-moreless`}
            value={morelessOptions.find((obj) => obj.value === value.moreless)}
            onChange={onChange}
          />
        </div>
        <div className="pr-0 pl-1 inline basis-5/12">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={name}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value[name])}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default LibrarySearchFormPoolCost;
