import React from 'react';

function ResultLibraryBurn(props) {
  const imgClass = 'burn-image-results';
  const imgSrc = process.env.ROOT_URL + 'images/misc/burn.gif';
  const imgTitle = 'Burn Option';

  if (props.value) {
    return (
      <span className='burn'>
        <img className={imgClass} src={imgSrc} title={imgTitle} />
      </span>
    );
  } else {
    return null;
  }
}

export default ResultLibraryBurn;
