import React from 'react';
import { Button } from 'components';
import { useApp } from 'context';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const { isMobile, isNarrow } = useApp();
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-blue font-bold">Group:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {groups.map((i, index) => {
          return (
            <Button
              className="w-full rounded-none"
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
