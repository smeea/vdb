import React from 'react';
import { ANY } from '@/utils/constants';

const ResultCryptGroup = ({ value }) => {
  return (
    <div className="flex font-bold">
      <div className="text-lightGray dark:text-lightGrayDark">G</div>
      {value === ANY ? 'X' : value}
    </div>
  );
};

export default ResultCryptGroup;
