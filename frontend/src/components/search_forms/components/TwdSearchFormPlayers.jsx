import React from 'react';
import { Select } from '@/components';
import { PLAYERS, ANY, FROM, TO } from '@/constants';

const TwdSearchFormPlayers = ({ value, onChange }) => {
  const name = PLAYERS;
  const steps = ['ANY', '100', '50', '25', '12'];

  const fromOptions = steps
    .filter((i) => {
      return i.toLowerCase() === ANY || value[TO] === ANY || !value[TO] || parseInt(i) < value[TO];
    })
    .map((i) => {
      return {
        value: i.toLowerCase(),
        name: FROM,
        label: <div className="flex justify-center">{i}</div>,
      };
    });

  const toOptions = steps
    .filter((i) => {
      return (
        i.toLowerCase() == ANY || value[FROM] === ANY || !value[FROM] || parseInt(i) > value[FROM]
      );
    })
    .map((i) => ({
      value: i.toLowerCase(),
      name: TO,
      label: <div className="flex justify-center">{i}</div>,
    }));

  return (
    <>
      <div className="flex items-center gap-1">
        <div className="w-1/4">
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Players:</div>
        </div>
        <div className="flex w-3/4 items-center gap-1">
          <div className="w-full">
            <Select
              options={fromOptions}
              isSearchable={false}
              name={name}
              value={fromOptions.find((obj) => obj.value === value[FROM])}
              onChange={onChange}
            />
          </div>
          <div className="px-1">to</div>
          <div className="w-full">
            <Select
              options={toOptions}
              isSearchable={false}
              name={name}
              value={toOptions.find((obj) => obj.value === value[TO])}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TwdSearchFormPlayers;
