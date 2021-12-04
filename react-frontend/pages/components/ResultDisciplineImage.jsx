import React from 'react';

function ResultLibraryDisciplineImage(props) {
  const imgClass = props.className
    ? props.className
    : props.superior
    ? 'discipline-superior-image-results'
    : 'discipline-base-image-results';

  const imgSrc = `${process.env.ROOT_URL}images/disciplines/${props.value
    .toLowerCase()
    .replace(/[\s,:!?'.\-]/g, '')}${props.superior ? 'sup' : ''}.svg`;

  const imgTitle = props.title ? props.title : props.value;

  return <img className={imgClass} src={imgSrc} title={imgTitle} />;
}

export default ResultLibraryDisciplineImage;
