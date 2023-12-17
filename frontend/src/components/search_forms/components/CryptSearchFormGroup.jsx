import React from 'react';
import { Button } from '@/components';

const CryptSearchFormGroup = ({ value, onChange }) => {
  const groups = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Group:
        </div>
      </div>
      <div className="flex w-3/4 justify-end">
        {groups.map((i, idx) => {
          return (
            <Button
              className={`w-full ${
                idx !== 0 ? 'rounded-l-none border-l-0' : ''
              } ${idx !== groups.length - 1 ? 'rounded-r-none' : ''} ${
                !value[i]
                  ? 'hover:bg-borderSecondary dark:hover:bg-borderSecondaryDark'
                  : 'border border-borderPrimary dark:border-borderPrimaryDark'
              }`}
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
