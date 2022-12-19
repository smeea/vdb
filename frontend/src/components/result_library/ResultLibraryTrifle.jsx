import React from 'react';

const ResultLibraryTrifle = () => {
  const imgClass = 'w-[24px] trifle-image';
  const imgSrc = `${process.env.ROOT_URL}images/misc/trifle.svg`;
  const imgTitle = 'Trifle';

  return (
    <span className="trifle">
      <img className={imgClass} src={imgSrc} title={imgTitle} />
    </span>
  );
};

export default ResultLibraryTrifle;
