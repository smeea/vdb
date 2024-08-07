import React from 'react';
import { Select } from '@/components';
import { capitalize } from '@/utils';
import { ANY } from '@/utils/constants';

const TwdSearchFormMatchInventory = ({ value, target, onChange }) => {
  const name = 'matchInventory';

  const options = [
    [ANY, 'ANY'],
    ['0.7', '70%+'],
    ['0.8', '80%+'],
    ['0.9', '90%+'],
    ['1.0', '100%'],
  ].map((i) => ({
    value: i[0],
    name: target,
    label: (
      <>
        <span />
        {i[1]}
      </>
    ),
  }));

  return (
    <div className="flex items-center">
      <div className="w-full">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          In Inventory by {capitalize(target)}:
        </div>
      </div>
      <div className="w-full">
        <Select
          options={options}
          isSearchable={false}
          name={name}
          value={options.find((obj) => obj.value === value.toLowerCase())}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormMatchInventory;
