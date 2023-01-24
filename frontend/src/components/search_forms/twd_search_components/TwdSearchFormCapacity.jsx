import React from 'react';
import { Button } from '@/components';

const TwdSearchFormCapacity = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Capacity Avg:
        </div>
      </div>
      <div className="flex w-3/4 justify-end">
        {['1-4', '4-6', '6-8', '8-11'].map((i, idx) => {
          return (
            <Button
              className={`w-full ${
                idx !== 0 ? 'rounded-l-none border-l-0' : ''
              } ${idx !== 3 ? 'rounded-r-none' : ''} ${
                !value[i]
                  ? 'hover:bg-borderSecondary dark:hover:bg-borderSecondaryDark'
                  : 'border border-borderPrimary dark:border-borderPrimaryDark'
              }`}
              key={idx}
              value={i}
              name="capacity"
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

export default TwdSearchFormCapacity;
