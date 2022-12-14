import React from 'react';

const ResultLibraryBurn = () => {
  const imgClass = 'burn-image-results';
  const imgSrc = `${process.env.ROOT_URL}images/misc/burn.svg`;
  const imgTitle = 'Burn Option';

  return (
    <span className="burn">
      <img className={imgClass} src={imgSrc} title={imgTitle} />
    </span>
  );
};

export default ResultLibraryBurn;
