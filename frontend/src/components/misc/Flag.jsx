import React from 'react';
import FlagEn from '@/assets/images/flags/en.svg?react';
import FlagEs from '@/assets/images/flags/es.svg?react';
import FlagFr from '@/assets/images/flags/fr.svg?react';
import FlagBr from '@/assets/images/flags/br.svg?react';
import { EN, ES, FR, PT } from '@/utils/constants';

const Flag = ({ value, size = '18' }) => {
  const languages = {
    [EN]: FlagEn,
    [ES]: FlagEs,
    [FR]: FlagFr,
    [PT]: FlagBr,
  };
  const SelectedFlag = languages[value];

  return <SelectedFlag width={size} height={size} viewBox="0 0 500 500" />;
};

export default Flag;
