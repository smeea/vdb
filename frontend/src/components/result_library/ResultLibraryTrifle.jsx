import React from 'react';

const ResultLibraryTrifle = () => {
  const imgClass = 'w-[24px] dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0]';
  const imgSrc = `${process.env.ROOT_URL}images/misc/trifle.svg`;
  const imgTitle = 'Trifle';

  return (
    <span className="trifle">
      <img className={imgClass} src={imgSrc} title={imgTitle} />
    </span>
  );
};

export default ResultLibraryTrifle;
