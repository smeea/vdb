import React from 'react';
import { ANY } from '@/utils/constants';

const ResultCryptGroup = ({ value }) => {
  return (
    <div className="flex font-bold">
      <div className="text-[#a0a0a0]">G</div>
      {value === ANY ? 'X' : value}
    </div>
  );
};

export default ResultCryptGroup;
