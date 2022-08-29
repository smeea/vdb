import React from 'react';

function ResultClanImage(props) {
  const imgClass = props.className ? props.className : 'clan-image-results';

  const imgSrc = `${process.env.ROOT_URL}images/clans/${props.value
    .toLowerCase()
    .replace(/[\s,:!?'.\-]/g, '')}.svg`;

  return <img className={imgClass} src={imgSrc} title={props.value} />;
}

export default ResultClanImage;
