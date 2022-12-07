import React from 'react';
import { Button } from 'components';
import { useApp } from 'context';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const { isMobile, isNarrow } = useApp();
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="ps-1 mx-0 flex flex-row items-center pt-2">
      <div className="flex basis-1/4 px-0">
        <div className="text-blue font-bold">Group:</div>
      </div>
      <div className="flex basis-9/12 justify-end px-0">
        {groups.map((i, index) => {
          return (
            <Button
              className={`group-form ${
                !isMobile && isNarrow ? 'px-2' : 'px-14px'
              }`}
              key={index}
              value={i}
              name="group"
              variant={value[i] ? 'third' : 'outline-primary'}
              onClick={onChange}
            >
              <div className="px-md-0 px-1">{i}</div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CryptSearchFormGroup;
