import React from 'react';

const ResultLibraryTrifle = () => {
  const imgClass = 'trifle-image-results';
  const imgSrc = `${process.env.ROOT_URL}images/misc/trifle.svg`;
  const imgTitle = 'Trifle';

  return (
    <span className="trifle">
      <img className={imgClass} src={imgSrc} title={imgTitle} />
    </span>
  );
};

export default ResultLibraryTrifle;
