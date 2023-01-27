import React from 'react';

const ResultClanImage = ({ value }) => {
  const imgClass = 'h-[21px] sm:h-[24px] dark:brightness-[0.65] inline';
  const imgSrc = `${import.meta.env.VITE_BASE_URL}/images/clans/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}.svg`;

  return <img className={imgClass} src={imgSrc} title={value} />;
};

export default ResultClanImage;
