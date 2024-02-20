import React from 'react';

const ResultCryptCapacity = ({ card }) => {
  return (
    <img
      className="w-[23px] dark:brightness-[0.85]"
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${
        card.Sect === 'Imbued' ? 'life' : 'cap'
      }${card.Capacity}.gif`}
      title="Capacity"
    />
  );
};

export default ResultCryptCapacity;
