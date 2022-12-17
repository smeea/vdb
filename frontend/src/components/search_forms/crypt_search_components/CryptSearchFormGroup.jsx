import React from 'react';
import { Button } from 'components';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-blue font-bold">Group:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {groups.map((i, idx) => {
          return (
            <Button
              className="w-full rounded-none"
              key={idx}
              value={i}
              name="group"
              variant={value[i] ? 'third' : 'outline-primary'}
              onClick={onChange}
            >
              {i}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CryptSearchFormGroup;
