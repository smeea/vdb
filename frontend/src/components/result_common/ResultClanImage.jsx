import React from 'react';

const ResultClanImage = ({ value }) => {
  return (
    <img
      className="h-[21px] sm:h-[24px] dark:brightness-[0.65] inline"
      src={`${import.meta.env.VITE_BASE_URL}/images/clans/${value
        .toLowerCase()
        .replace(/[\s,:!?'.-]/g, '')}.svg`}
      title={value}
    />
  );
};

export default ResultClanImage;
