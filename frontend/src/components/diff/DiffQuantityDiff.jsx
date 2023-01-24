import React from 'react';
import ArrowDown from '@/assets/images/icons/arrow-down.svg';
import ArrowUp from '@/assets/images/icons/arrow-up.svg';
import XLg from '@/assets/images/icons/x-lg.svg';

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  if (qFrom == qTo) {
    return '';
  } else if (qFrom == 0) {
    return (
      <div className="red">
        <XLg className="inline" viewBox="-3 0 17 17" />
      </div>
    );
  } else if (qFrom < qTo) {
    return (
      <div className="red">
        <ArrowDown className="inline" viewBox="0 2 16 16" />
        {qTo - qFrom}
      </div>
    );
  } else if (qFrom > qTo) {
    return (
      <div className="text-fgGreen dark:text-fgGreenDark">
        <ArrowUp className="inline" viewBox="0 2 16 16" />
        {qFrom - qTo}
      </div>
    );
  }
};

export default DiffQuantityDiff;
