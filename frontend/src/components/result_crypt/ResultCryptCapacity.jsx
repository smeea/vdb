import React from 'react';

const ResultCryptCapacity = ({ card }) => {
  const imgClass = 'w-[23px] dark:brightness-[0.85] optimize-contrast';
  const imgSrc = `${import.meta.env.VITE_BASE_URL}/images/misc/${
    card.Sect === 'Imbued' ? 'life' : 'cap'
  }${card.Capacity}.gif`;

  return <img className={imgClass} src={imgSrc} title="Capacity" />;
};

export default ResultCryptCapacity;
