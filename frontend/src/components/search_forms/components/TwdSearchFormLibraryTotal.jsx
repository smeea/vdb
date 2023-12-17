import React from 'react';
import { Button } from '@/components';

const TwdSearchFormLibraryTotal = ({ value, onChange }) => {
  const name = 'libraryTotal';

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Library Size:
        </div>
      </div>
      <div className="flex w-3/4 justify-end">
        {['60-67', '68-75', '76-83', '84-90'].map((i, idx) => {
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
              name={name}
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

export default TwdSearchFormLibraryTotal;
