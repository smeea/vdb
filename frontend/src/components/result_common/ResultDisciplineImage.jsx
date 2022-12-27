import React from 'react';

const ResultDisciplineImage = ({ value, superior, name, className, title }) => {
  const imgClass = className
    ? className
    : `inline dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] ${
        superior
          ? 'w-[24px] sm:w-[25px]'
          : 'w-[22px]'
      }`;

  const imgSrc = `${process.env.ROOT_URL}images/disciplines/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}${superior ? 'sup' : ''}.svg`;

  const imgTitle = title ?? value;

  return (
    <img
      className={imgClass}
      src={imgSrc}
      name={name}
      id={imgTitle}
      title={imgTitle}
    />
  );
};

export default ResultDisciplineImage;
