import React from 'react';

const ResultPathImage = ({ value }) => {
  if (!value) return;

  return (
    <img
      className="inline max-h-[25px] max-w-[25px] dark:brightness-[0.65] sm:max-h-[28px] sm:max-w-[28px]"
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/path${value.toLowerCase().replace(/ .*/, '')}.svg`}
      title={value}
    />
  );
};

export default ResultPathImage;
