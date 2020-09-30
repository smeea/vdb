import React from 'react';

function ResultCryptCapacity(props) {
  const imgClass = 'capacity-image-results';
  const imgSrc = '/images/misc/cap' + props.value + '.png';

  return (
    <span className='capacity'>
      <img className={imgClass} src={imgSrc} title='Capacity' />
    </span>
  );
}

export default ResultCryptCapacity;
