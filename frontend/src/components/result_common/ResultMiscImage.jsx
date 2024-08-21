import React from 'react';
import { ResultDisciplineImage } from '@/components';
import cardtextIcons from '@/assets/data/cardtextIcons.json';
import disciplinesList from '@/assets/data/disciplinesList.json';

const ResultMiscImage = ({ value, title, size = 'md' }) => {
  const discipline = [
    ...Object.entries(disciplinesList),
    ['Maleficia', 'mal'],
    ['Striga', 'str'],
  ].find((i) => i[1] == value.toLowerCase());
  const isSuperior = discipline && value !== value.toLowerCase();

  const sizeStyle = {
    md: 'min-w-[22px] max-w-[22px] h-[22px]',
    lg: 'min-w-[25px] max-w-[25px] h-[25px]',
    xl: 'min-w-[29px] max-w-[29px] h-[29px]',
  };

  return (
    <>
      {discipline ? (
        <ResultDisciplineImage isSuperior={isSuperior} value={discipline[0]} />
      ) : (
        <img
          src={`${import.meta.env.VITE_BASE_URL}/images/${cardtextIcons[value]}.svg`}
          title={title ?? value}
          className={`inline ${sizeStyle[size]} drop-shadow-[0px_0px_1px_#a0a0a0] dark:brightness-[0.85] dark:drop-shadow-[0px_0px_1px_#d0d0d0]`}
        />
      )}
    </>
  );
};

export default ResultMiscImage;
