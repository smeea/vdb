import React from 'react';
import virtuesList from '@/assets/data/virtuesList.json';

const ResultDisciplineImage = ({
  value,
  superior,
  name,
  className,
  width,
  title,
}) => {
  const imgClass = `inline dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] ${
    width ??
    (superior || virtuesList.includes(value)
      ? 'min-w-[25px] max-w-[25px]'
      : 'min-w-[22px] max-w-[22px]')
  } ${className ?? ''}`;

  const imgSrc = `${import.meta.env.VITE_BASE_URL}/images/disciplines/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}${superior ? 'sup' : ''}.svg`;

  return (
    <img
      className={imgClass}
      src={imgSrc}
      name={name}
      id={title ?? value}
      title={title ?? value}
    />
  );
};

export default ResultDisciplineImage;
