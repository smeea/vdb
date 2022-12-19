import React from 'react';

const ResultClanImage = ({ value }) => {
  const imgClass = 'h-[21px] sm:h-[24px] clan-image inline';
  const imgSrc = `${process.env.ROOT_URL}images/clans/${value
    .toLowerCase()
    .replace(/[\s,:!?'.-]/g, '')}.svg`;

  return <img className={imgClass} src={imgSrc} title={value} />;
};

export default ResultClanImage;
