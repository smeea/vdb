import React from 'react';
import Select from 'react-select';
import { useApp } from 'context';

const TwdSearchFormPlayers = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'players';
  const fromOptions = [];
  const toOptions = [];

  ['ANY', '100', '50', '30', '20', '10'].map((i) => {
    if (i === 'ANY' || value.to === 'any' || parseInt(i) < value.to) {
      fromOptions.push({
        value: i.toLowerCase(),
        name: 'from',
        label: <div className="flex justify-center">{i}</div>,
      });
    }

    if (i === 'ANY' || value.from === 'any' || parseInt(i) > value.from) {
      toOptions.push({
        value: i.toLowerCase(),
        name: 'to',
        label: <div className="flex justify-center">{i}</div>,
      });
    }
  });

  return (
    <>
      <div className="flex items-center space-x-1">
        <div className="w-1/4">
          <div className="text-blue font-bold">Players:</div>
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
    </>
  );
};

export default TwdSearchFormPlayers;
