import React from 'react';
import { ButtonGroup } from '@/components';
import { CAPACITY } from '@/constants';

const TwdSearchFormCapacity = ({ value, onChange }) => {
  const name = CAPACITY;
  const options = ['1-4', '4-6', '6-8', '8-11'];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Capacity Avg:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {options.map((i) => (
          <ButtonGroup isSelected={value[i]} key={i} name={name} onClick={onChange} value={i}>
            {i}
          </ButtonGroup>
        ))}
      </div>
    </div>
  );
};

export default TwdSearchFormCapacity;
