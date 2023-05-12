import React from 'react';

const ResultLibraryCost = ({ valueBlood, valuePool, className }) => {
  return (
    <>
      {valueBlood ? (
        <img
          className={`optimize-contrast max-h-[30px] ${className ?? ''}`}
          src={`${
            import.meta.env.VITE_BASE_URL
          }/images/misc/blood${valueBlood}.gif`}
          title="Blood Cost"
        />
      ) : (
        <img
          className={`optimize-contrast max-h-[35px] ${className ?? ''}`}
          src={`${
            import.meta.env.VITE_BASE_URL
          }/images/misc/pool${valuePool}.gif`}
          title="Pool Cost"
        />
      )}
    </>
  );
};

export default ResultLibraryCost;
