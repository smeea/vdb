import React from 'react';
import cardtextIcons from '@/assets/data/cardtextIcons.json';

const ResultMiscImage = ({ value, title }) => {
  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/images/${cardtextIcons[value]}.svg`}
      title={title}
      className="inline w-[25px] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:brightness-[0.85] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0]"
    />
  );
};

export default ResultMiscImage;
