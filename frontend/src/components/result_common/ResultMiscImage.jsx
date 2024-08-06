import React from 'react';
import cardtextIcons from '@/assets/data/cardtextIcons.json';

const ResultMiscImage = ({ value, title }) => {
  const isSuperiorDiscipline =
    cardtextIcons[value].includes('disciplines/') && value == value.toUpperCase();

  const size = isSuperiorDiscipline ? 'h-[25px] w-[25px]' : 'h-[22px] w-[22px]';

  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/images/${cardtextIcons[value]}.svg`}
      title={title}
      className={`inline ${size} drop-shadow-[0px_0px_1px_#a0a0a0] dark:brightness-[0.85] dark:drop-shadow-[0px_0px_1px_#d0d0d0]`}
    />
  );
};

export default ResultMiscImage;
