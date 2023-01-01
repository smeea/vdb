import React from 'react';
import cardtextIcons from 'assets/data/cardtextIcons.json';

const ResultMiscImage = ({ value, title }) => {
  return (
    <img
      src={`${process.env.ROOT_URL}images/disciplines/${cardtextIcons[value]}.svg`}
      title={title}
      className="inline dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] w-[25px]"
    />
  );
};

export default ResultMiscImage;
