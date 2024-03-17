import React from 'react';

import FlagEn from '@/assets/images/flags/en.svg?react';
import FlagEs from '@/assets/images/flags/es.svg?react';
import FlagFr from '@/assets/images/flags/fr.svg?react';
import FlagBr from '@/assets/images/flags/br.svg?react';

const Flag = ({ value, size = '18' }) => {
  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };
  const SelectedFlag = languages[value];

  return <SelectedFlag width={size} height={size} viewBox="0 0 500 500" />;
};

export default Flag;
