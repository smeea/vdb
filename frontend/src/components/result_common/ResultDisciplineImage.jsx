import React from 'react';

const ResultDisciplineImage = ({ value, superior, name, className, title }) => {
  const imgClass = className
    ? className
    : `inline ${
        superior
          ? 'w-[24px] sm:w-[25px] discipline-image'
          : 'w-[22px] discipline-image'
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
