import React from 'react';

const ResultCryptCapacity = ({ card }) => {
  return (
    <img
      className="w-[23px] dark:brightness-[0.85]"
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${
        card[SECT] === 'Imbued' ? 'life' : 'cap'
      }${card[CAPACITY]}.gif`}
      title="Capacity"
    />
  );
};

export default ResultCryptCapacity;
