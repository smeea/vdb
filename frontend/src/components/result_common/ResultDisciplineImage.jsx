import React from 'react';

const ResultDisciplineImage = ({ value, superior, className, title }) => {
  const imgClass = className
    ? className
    : superior
    ? 'discipline-superior-image-results'
    : 'discipline-base-image-results';

  const imgSrc = `${process.env.ROOT_URL}images/disciplines/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}${superior ? 'sup' : ''}.svg`;

  const imgTitle = title ?? value;

  return <img className={imgClass} src={imgSrc} title={imgTitle} />;
};

export default ResultDisciplineImage;
