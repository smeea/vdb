import React from 'react';
import miscIcons from 'assets/data/miscIcons.json';
// import virtuesList from 'assets/data/virtuesList.json';

const ResultMiscImage = ({ value, title }) => {
  // console.log(value);

  const imgClass =
    'inline dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] w-[25px]';

  const imgSrc = `${process.env.ROOT_URL}images/disciplines/${miscIcons[value]}.svg`;

  return <img src={imgSrc} title={title} className={imgClass} />;
};

export default ResultMiscImage;
