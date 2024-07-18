import React from 'react';

const ResultClanImage = ({ value }) => {
  return (
    <img
      className="inline h-[21px] dark:brightness-[0.65] sm:h-[24px]"
      src={`${import.meta.env.VITE_BASE_URL}/images/clans/${value
        .toLowerCase()
        .replace(/[\s,:!?'.-]/g, '')}.svg`}
      title={value}
    />
  );
};

export default ResultClanImage;
