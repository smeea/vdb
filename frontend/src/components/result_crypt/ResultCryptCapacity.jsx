import React from 'react';

const ResultCryptCapacity = ({ value }) => {
  const imgClass = 'w-[23px] dark:brightness-[0.85] optimize-contrast';
  const imgSrc = `${import.meta.env.VITE_BASE_URL}/images/misc/cap${value}.png`;

  return <img className={imgClass} src={imgSrc} title="Capacity" />;
};

export default ResultCryptCapacity;
