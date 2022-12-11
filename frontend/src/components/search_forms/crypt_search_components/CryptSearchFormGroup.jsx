import React from 'react';
import { Button } from 'components';
import { useApp } from 'context';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const { isMobile, isNarrow } = useApp();
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex flex-row items-center ">
      <div className="flex basis-1/4">
        <div className="text-blue font-bold">Group:</div>
      </div>
      <div className="flex basis-9/12 justify-end">
        {groups.map((i, index) => {
          return (
            <Button
              className={`group-form ${!isMobile && isNarrow ? '' : '4px'}`}
              key={index}
              value={i}
              name="group"
              variant={value[i] ? 'third' : 'outline-primary'}
              onClick={onChange}
            >
              <div>{i}</div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CryptSearchFormGroup;
