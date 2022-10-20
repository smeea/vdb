import React from 'react';

const ResultClanImage = ({ value, className }) => {
  const imgClass = className ?? 'clan-image-results';

  const imgSrc = `${process.env.ROOT_URL}images/clans/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}.svg`;

  return <img className={imgClass} src={imgSrc} title={value} />;
};

export default ResultClanImage;
