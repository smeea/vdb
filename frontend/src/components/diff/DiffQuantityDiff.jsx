import React from 'react';
import ArrowDown from '@/assets/images/icons/arrow-down.svg?react';
import ArrowUp from '@/assets/images/icons/arrow-up.svg?react';
import XLg from '@/assets/images/icons/x-lg.svg?react';

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  return (
    <td className="min-w-[35px] text-lg">
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
    </td>
  );
};

export default DiffQuantityDiff;
