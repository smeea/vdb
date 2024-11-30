import React from 'react';
import ArrowDown from '@icons/arrow-down.svg?react';
import ArrowUp from '@icons/arrow-up.svg?react';
import XLg from '@icons/x-lg.svg?react';

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  return (
    <div className="flex justify-center sm:px-1">
      {qFrom == qTo ? (
        ''
      ) : qFrom == 0 ? (
        <div className="whitespace-nowrap text-fgRed dark:text-fgRedDark">
          <XLg className="inline" viewBox="-3 0 17 17" />
        </div>
      ) : qFrom < qTo ? (
        <div className="whitespace-nowrap text-fgRed dark:text-fgRedDark">
          <ArrowDown className="inline" viewBox="0 2 16 16" />
          {qTo - qFrom}
        </div>
      ) : (
        <div className="whitespace-nowrap text-fgGreen dark:text-fgGreenDark">
          <ArrowUp className="inline" viewBox="0 2 16 16" />
          {qFrom - qTo}
        </div>
      )}
    </div>
  );
};

export default DiffQuantityDiff;
