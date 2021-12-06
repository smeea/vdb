import React from 'react';

function ResultCryptCapacity(props) {
  const imgClass = 'capacity-image-results';
  const imgSrc = `${process.env.ROOT_URL}images/misc/cap${props.value}.png`;

  return <img className={imgClass} src={imgSrc} title="Capacity" />;
}

export default ResultCryptCapacity;
