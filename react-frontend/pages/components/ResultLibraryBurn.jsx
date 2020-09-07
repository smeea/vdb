import React from 'react';

function ResultLibraryBurn(props) {
  const imgClass='burn-image-results';
  const imgSrc=process.env.ROOT_URL + 'images/misc/burn.gif';

  if (props.value) {
    return (
      <span className='burn'>
        <img className={imgClass} src={imgSrc} />
      </span>
    );
  } else {
    return <span className='burn'></span>;
  }
}

export default ResultLibraryBurn;
