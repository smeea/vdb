import React from 'react';
import { isTrifle } from 'utils';

const ResultLibraryTrifle = ({ card }) => {
  const imgClass = 'trifle-image-results';
  const imgSrc = `${process.env.ROOT_URL}images/misc/trifle.svg`;
  const imgTitle = 'Trifle';

  if (isTrifle(card)) {
    return (
      <span className="trifle">
        <img className={imgClass} src={imgSrc} title={imgTitle} />
      </span>
    );
  } else {
    return null;
  }
};

export default ResultLibraryTrifle;
