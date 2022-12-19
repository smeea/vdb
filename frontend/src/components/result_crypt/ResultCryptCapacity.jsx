import React from 'react';

function ResultCryptCapacity(props) {
  const imgClass = 'w-[23px] capacity-image';
  const imgSrc = `${process.env.ROOT_URL}images/misc/cap${props.value}.png`;

  return <img className={imgClass} src={imgSrc} title="Capacity" />;
}

export default ResultCryptCapacity;
