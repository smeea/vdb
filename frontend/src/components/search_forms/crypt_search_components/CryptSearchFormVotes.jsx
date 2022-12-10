import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const CryptSearchFormVotes = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const options = [
    ['any', 'ANY'],
    ['0', 'None'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ].map((i) => ({
    value: i[0],
    name: 'votes',
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i[1]}
      </div>
    ),
  }));

  return (
    <div className="pl-1 mx-0 flex flex-row items-center py-1">
      <div className="flex basis-1/4 px-0">
        <div className="text-blue font-bold">Votes:</div>
      </div>
      <div className="inline basis-9/12 px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name="votes"
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CryptSearchFormVotes;
