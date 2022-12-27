import React from 'react';

const ResultCryptCapacity = ({value}) => {
  const imgClass = 'w-[23px] dark:brightness-[0.85] capacity-image';
  const imgSrc = `${process.env.ROOT_URL}images/misc/cap${value}.png`;

  return <img className={imgClass} src={imgSrc} title="Capacity" />;
}

export default ResultCryptCapacity;
