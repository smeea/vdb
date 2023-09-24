import React from 'react';
import ArrowDown from '@/assets/images/icons/arrow-down.svg?react';
import ArrowUp from '@/assets/images/icons/arrow-up.svg?react';
import XLg from '@/assets/images/icons/x-lg.svg?react';

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  return (
    <td className="w-[42px] min-w-[35px] text-lg">
      {qFrom == qTo ? (
        ''
      ) : qFrom == 0 ? (
        <div className="text-fgRed dark:text-fgRedDark">
          <XLg className="inline" viewBox="-3 0 17 17" />
        </div>
      ) : qFrom < qTo ? (
        <div className="text-fgRed dark:text-fgRedDark">
          <ArrowDown className="inline" viewBox="0 2 16 16" />
          {qTo - qFrom}
        </div>
      ) : (
        <div className="text-fgGreen dark:text-fgGreenDark">
          <ArrowUp className="inline" viewBox="0 2 16 16" />
          {qFrom - qTo}
        </div>
      )}
    </td>
  );
};

export default DiffQuantityDiff;
