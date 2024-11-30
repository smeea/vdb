import React from 'react';
import { EN, ES, FR, PT } from '@/constants';

const Flag = ({ value, size = 'md', noTitle }) => {
  const icons = {
    [EN]: {
      filename: 'en',
      title: 'English',
    },
    [ES]: {
      filename: 'es',
      title: 'Spanish',
    },
    [FR]: {
      filename: 'fr',
      title: 'French',
    },
    [PT]: {
      filename: 'br',
      title: 'Portuguese',
    },
  };
  const sizeStyle = {
    md: 'h-[18px]',
    lg: 'h-[22px]',
  };

  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/flag-${icons[value].filename}.svg`}
      title={!noTitle ? icons[value].title : null}
      className={sizeStyle[size]}
    />
  );
};

export default Flag;
