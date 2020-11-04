import React from 'react';

function ResultLibraryType(props) {
  const imgClass = 'type-image-results';
  const cardtypes = props.cardtype.split('/');
  const cardtypeImages = cardtypes.map((cardtype, index) => {
    const imgSrc = `${
      process.env.ROOT_URL
    }images/types/${cardtype.toLowerCase().replace(/[\s,:!?'.\-]/g, '')}.svg`;
    const imgTitle = cardtype;
    return (
      <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
    );
  });

  if (props.total > 0) {
    return (
      <>
        {cardtypeImages} {props.cardtype} [{props.total}]
      </>
    );
  } else if (props.total == 0) {
    return (
      <>
        {cardtypeImages} {props.cardtype}
      </>
    );
  } else {
    return <>{cardtypeImages}</>;
  }
}

export default ResultLibraryType;
