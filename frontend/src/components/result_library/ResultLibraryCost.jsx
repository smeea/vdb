import React from 'react';
import { twMerge } from 'tailwind-merge';
import { BLOOD_COST, POOL_COST } from '@/utils/constants';

const ResultLibraryCost = ({ valueBlood, valuePool, className = '' }) => {
  return (
    <img
      className={twMerge(`${valueBlood ? 'max-h-[30px]' : 'max-h-[35px]'}`, className)}
      title={valueBlood ? BLOOD_COST : POOL_COST}
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${
        valueBlood ? `blood${valueBlood}` : `pool${valuePool}`
      }.gif`}
    />
  );
};

export default ResultLibraryCost;
