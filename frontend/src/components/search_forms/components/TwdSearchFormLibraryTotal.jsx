import React from 'react';
import { ButtonGroup } from '@/components';

const TwdSearchFormLibraryTotal = ({ value, onChange }) => {
  const name = 'libraryTotal';
  const options = ['60-67', '68-75', '76-83', '84-90'];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Library Size:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {options.map((i, idx) => {
          return (
            <ButtonGroup
              isFirst={idx == 0}
              isLast={idx == options.length - 1}
              isSelected={value[i]}
              key={idx}
              name={name}
              onClick={onChange}
              value={i}
            >
              {i}
            </ButtonGroup>
          );
        })}
      </div>
    </div>
  );
};

export default TwdSearchFormLibraryTotal;
