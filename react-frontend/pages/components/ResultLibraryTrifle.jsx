import React from 'react';

function ResultLibraryTrifle(props) {
  const imgClass = 'trifle-image-results';
  const imgSrc = `${process.env.ROOT_URL}images/misc/trifle.gif`;
  const imgTitle = 'Trifle';

  if (props.value.includes('Trifle.')) {
    return (
      <span className="trifle">
        <img className={imgClass} src={imgSrc} title={imgTitle} />
      </span>
    );
  } else {
    return null;
  }
}

export default ResultLibraryTrifle;
