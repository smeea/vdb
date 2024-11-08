import React from 'react';
import { ButtonGroup } from '@/components';
import { GROUP } from '@/constants';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const name = GROUP;
  const options = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Group:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {options.map((i, idx) => {
          return (
            <ButtonGroup isSelected={value[i]} key={idx} name={name} onClick={onChange} value={i}>
              {i}
            </ButtonGroup>
          );
        })}
      </div>
    </div>
  );
};

export default CryptSearchFormGroup;
