import React from 'react';
import { ANY } from '@/constants';

const ResultCryptGroup = ({ value }) => {
  return (
    <div className="flex font-bold">
      <div className="text-lightGrayDark dark:text-lightGrayDark">G</div>
      {value === ANY ? 'X' : value}
    </div>
  );
};

export default ResultCryptGroup;
