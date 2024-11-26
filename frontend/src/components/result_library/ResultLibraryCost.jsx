import React from 'react';
import { twMerge } from 'tailwind-merge';
import { capitalize } from '@/utils';
import { BLOOD, POOL, CONVICTION } from '@/constants';

const ResultLibraryCost = ({ card, className }) => {
  const target = card[BLOOD] ? BLOOD : card[POOL] ? POOL : CONVICTION;
  const value = card[target];
  if (value == 0) return;

  const styles = {
    [BLOOD]: 'max-h-[29px]',
    [POOL]: 'max-h-[35px]',
    [CONVICTION]: 'max-h-[30px]',
  };

  return (
    <img
      className={twMerge(styles[target], className)}
      title={`${capitalize(target)} Cost ${value}`}
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${target}${value}.${target == CONVICTION ? 'svg' : 'gif'}`}
    />
  );
};

export default ResultLibraryCost;
