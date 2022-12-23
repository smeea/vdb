import React from 'react';
import { Button } from 'components';

const TwdSearchFormCapacity = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Capacity Avg:</div>
      </div>
      <div className="flex w-3/4 justify-end">
        {['1-4', '4-6', '6-8', '8-11'].map((i, index) => {
          return (
            <Button
              className="w-full rounded-none"
              key={index}
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
