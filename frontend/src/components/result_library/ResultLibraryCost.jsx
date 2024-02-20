import React from 'react';

const ResultLibraryCost = ({ valueBlood, valuePool, className = '' }) => {
  return (
    <img
      className={`${valueBlood ? 'max-h-[30px]' : 'max-h-[35px]'} ${className}`}
      title={valueBlood ? 'Blood Cost' : 'Pool Cost'}
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${
        valueBlood ? `blood${valueBlood}` : `pool${valuePool}`
      }.gif`}
    />
  );
};

export default ResultLibraryCost;
